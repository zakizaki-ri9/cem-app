import { app } from '../initializers/bolt'
import { FieldValue, firestore } from '../initializers/firebase'
import { Challenge, Message, Project } from '../types/slack'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ModalDto {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public projectTitle: string,
    public year: number,
    public month: number,
    public challengeArea: string,
    public description: string
  ) {}

  public static toProjectTitle(obj: Object | unknown): string {
    if (obj instanceof Object) {
      const a = Object.values(obj)
      return a[0].value
    }
    return ``
  }
}

class Key {
  // eslint-disable-next-line no-useless-constructor
  constructor(public key: string) {}

  public isProjectTitle() {
    return this.key.includes(`projectTitle`)
  }

  public isYear() {
    return this.key.includes(`year`)
  }

  public isMonth() {
    return this.key.includes(`month`)
  }

  public isDescription() {
    return this.key.includes(`description`)
  }

  public isChallenge() {
    return this.key.includes(`challenge`)
  }
}

async function addDeleteBatch(challengerRef, batch) {
  // HACK:呼び出し元で二重発行している
  const projectDeleteQuery = firestore
    .collection(`projects`)
    .where(`challenger`, `==`, challengerRef)
    .where(`status`, `==`, `draft`)

  const projects = await projectDeleteQuery.get().catch(err => {
    throw new Error(err)
  })

  for (const project of projects.docs) {
    const projectDel = firestore.collection(`projects`).doc(project.id)
    const challengesRef = await projectDel.collection(`challenges`).get()
    challengesRef.docs.forEach(challenge => {
      batch.delete(challenge.ref)
    })
    batch.delete(projectDel)
  }
}

app.view(`cem_edit`, async ({ ack, body, view, context }) => {
  ack()

  const user = body.user.id
  const challengerRef = firestore.collection(`challengers`).doc(user)
  const projectsRef = firestore.collection(`projects`)
  const timestamp = await FieldValue.serverTimestamp()
  // firestoreからプロジェクトとサブコレクションのチャレンジを削除
  const batch = firestore.batch()
  await addDeleteBatch(challengerRef, batch)

  const payload = (view.state as any).values

  const modalDtoList: ModalDto[] = []

  let year = 0
  let month = 0
  let projectTitle = ``
  let description = ``
  let challengeList = ``
  console.log(payload)
  // key情報を無理やり取得する
  for (const [keys, value] of Object.entries(payload)) {
    const key = new Key(keys)
    if (key.isProjectTitle()) {
      projectTitle = ModalDto.toProjectTitle(value)
    }

    if (key.isYear()) {
      if (value instanceof Object) {
        const a = Object.values(value)
        year = Number(a[0].selected_option.value)
      }
    }

    if (key.isMonth()) {
      if (value instanceof Object) {
        const a = Object.values(value)
        month = Number(a[0].selected_option.value)
      }
    }

    if (key.isDescription()) {
      if (value instanceof Object) {
        const a = Object.values(value)
        description = a[0].value
        // TODO: undefinedだったらブランク
      }
    }

    if (key.isChallenge()) {
      if (value instanceof Object) {
        const a = Object.values(value)
        challengeList = a[0].value
      }
    }

    if (
      projectTitle !== `` &&
      year !== 0 &&
      month !== 0 &&
      description !== `` &&
      challengeList !== ``
    ) {
      modalDtoList.push(
        new ModalDto(projectTitle, year, month, challengeList, description)
      )

      // reset
      projectTitle = ``
      year = 0
      month = 0
      description = ``
      challengeList = ``
    }
  }

  // firestoreにプロジェクト作成

  for (const modalDto of modalDtoList) {
    const project: Project = {
      challenger: challengerRef,
      year: modalDto.year,
      month: modalDto.month,
      title: modalDto.projectTitle,
      status: `draft`,
      description: modalDto.description,
      updatedAt: timestamp,
      createdAt: timestamp,
    }
    const projectRef = await projectsRef.add(project).catch(err => {
      throw new Error(err)
    })

    // firestoreに挑戦を行ごとにパーズして保存
    for (const challengeName of modalDto.challengeArea.split(/\n/)) {
      if (challengeName === ``) {
        continue
      }
      const challenge: Challenge = {
        challenger: challengerRef,
        year: modalDto.year,
        month: modalDto.month,
        name: challengeName,
        status: `draft`,
        updatedAt: timestamp,
        createdAt: timestamp,
      }
      batch.set(projectRef.collection(`challenges`).doc(), challenge)
    }
  }

  await batch.commit()
  // 成功をSlack通知
  const msg: Message = {
    token: context.botToken,
    text: `プロジェクトを修正しました`,
    channel: body.view.private_metadata,
    user: user,
  }
  await app.client.chat.postEphemeral(msg as any).catch(err => {
    throw new Error(err)
  })
})
