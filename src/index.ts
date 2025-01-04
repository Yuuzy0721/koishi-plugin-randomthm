import { Context, Schema, h } from 'koishi'

export const name = 'rtm'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // 直链api https://music.163.com/song/media/outer/url?id=537407937.mp3
}
