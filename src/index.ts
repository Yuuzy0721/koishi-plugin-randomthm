import { Context, Schema, h, Session } from 'koishi'
import { id } from './id'


export const name = 'rtm'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // 直链api https://music.163.com/song/media/outer/url?id=歌曲id.mp3
  ctx.command('rtm', '随机东方曲').alias('随机东方曲').action(async ({ session }) => {
    if (!session) return
    let randomIndex = Math.floor(Math.random() * id.length)
    let randomid = id[randomIndex]
    //console.log('歌曲id' + randomid)
    await session.send(h.audio(`https://music.163.com/song/media/outer/url?id=${randomid}.mp3`))
  })
}
