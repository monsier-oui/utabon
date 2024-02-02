import arrayShuffle from 'array-shuffle'
import React, { useState } from 'react'

import Aside from '@/components/Aside'
import Button from '@/components/Button'
import Header from '@/components/Header'
import idolsData from '@/database/idols'
import songsData from '@/database/songs/index'
import type Song from '@/types/Song'

const tags: string[] = [
  ...new Set(
    songsData
      .filter((song) => song.tags && song.tags.length > 0)
      .map((song) => song.tags || '')
      .flat()
  ),
]
const idols: string[] = [
  ...new Set(idolsData.map((idol) => [idol.unit, idol.name]).flat()),
]

const App = () => {
  type Options = {
    provider: string
    yaminabe: boolean
    tags: string[]
    idols: string[]
  }
  const initialOptionsValue: Options = {
    provider: '',
    yaminabe: false,
    tags: [],
    idols: [],
  }

  const [songs, setSongs] = useState(songsData)
  const [randomSongs, setRandomSongs] = useState<Song[]>([])
  const [options, setOptions] = useState(initialOptionsValue)

  const handleOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name
    const result: Partial<Options> = {}
    if (key === 'provider') {
      result['provider'] = event.target.value || ''
    } else if (key === 'yaminabe') {
      result['yaminabe'] = event.target.checked
    } else if (key === 'tags') {
      result['tags'] = [event.target.value]
    } else if (key === 'idols') {
      if (event.target.checked) {
        result['idols'] = [...options.idols, event.target.value]
      } else {
        result['idols'] = options.idols.filter((v) => v !== event.target.value)
      }
    }
    const alterOptions: Options = { ...options, ...result }
    setOptions(alterOptions)
    if (key !== 'yaminabe') {
      update(alterOptions)
    }
  }

  const update = (options: Options) => {
    let result = [...songsData]
    if (options.provider) {
      result = result.filter(
        (song) => song[options.provider as keyof Song] !== undefined
      )
    }
    if (options.tags.length > 0) {
      result = result.filter(
        (song) =>
          song.tags && song.tags.some((tag) => options.tags.includes(tag))
      )
    }
    if (options.idols.length > 0) {
      result = result.filter(
        (song) =>
          song.idols && song.idols.some((idol) => options.idols.includes(idol))
      )
    }

    setSongs(result)
  }

  const random = () => {
    let randomSongsData = randomSongs
    if (randomSongsData.length < 1) {
      randomSongsData = songsData
      if (options.provider) {
        randomSongsData = randomSongsData.filter(
          (song) => song[options.provider as keyof Song] !== undefined
        )
      }
      randomSongsData = arrayShuffle(randomSongsData)
    }
    const songs = randomSongsData.splice(0, 10)
    setSongs(songs)
    setRandomSongs(randomSongsData)
  }

  const reset = () => {
    setOptions(initialOptionsValue)
    update(initialOptionsValue)
  }

  return (
    <div className="container my-6 bg-white text-neutral-600">
      <Header />

      <div className="mt-8 flex gap-2">
        {['JOY', 'DAM'].map((provider) => (
          <label key={provider} className="flex cursor-pointer gap-1">
            <input
              type="radio"
              name="provider"
              value={provider}
              onChange={handleOptionsChange}
              checked={options.provider === provider}
            />
            {provider}
          </label>
        ))}
        <label className="ml-auto flex cursor-pointer gap-1">
          <input
            type="checkbox"
            name="yaminabe"
            value=""
            onChange={handleOptionsChange}
            checked={options.yaminabe}
            disabled={options.provider === ''}
          />
          闇鍋モード
        </label>
      </div>
      <ul className="filters mt-4 flex flex-wrap gap-y-1 gap-x-2">
        {tags.map((tag) => (
          <label
            key={tag}
            className="relative py-1 text-sm cursor-pointer before:content-['#']">
            <input
              type="radio"
              name="tags"
              value={tag}
              checked={options.tags.includes(tag)}
              onChange={handleOptionsChange}
              className="absolute opacity-0"
            />
            {tag}
          </label>
        ))}
        {idols.map((idol) => (
          <label
            key={idol}
            className="relative py-1 text-sm cursor-pointer before:content-['#']">
            <input
              type="checkbox"
              name="idols"
              value={idol}
              checked={options.idols.includes(idol)}
              onChange={handleOptionsChange}
              className="absolute opacity-0"
            />
            {idol}
          </label>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-4">
        <Button color="primary" onClick={random}>
          ランダム10連
        </Button>
        <Button onClick={reset}>リセット</Button>
      </div>

      <div className="mt-8">
        {songs.length > 0 ? (
          <>
            <p className="">{songs.length}曲見つかりました。</p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {songs.map((song, i) =>
                options.yaminabe && options.provider ? (
                  <span key={i} className="block p-4 text-center text-4xl">
                    {song[options.provider as keyof Song]}
                  </span>
                ) : (
                  <div
                    key={i}
                    className="flex rounded border border-neutral-200">
                    <div className="p-4">
                      <span className="block break-words md:text-lg">
                        {song.title}
                      </span>
                      <span className="mt-1 block text-sm text-neutral-500">
                        {song.idols.join(' & ')}
                      </span>
                    </div>
                    <dl className="ml-auto grid w-2/5 shrink-0 grid-cols-[repeat(2,auto)] border-l border-neutral-200">
                      {(!options.provider || options.provider === 'JOY') && (
                        <>
                          <dt className="flex items-center border-b border-neutral-200 p-2 last-of-type:border-none md:px-4">
                            JOY
                          </dt>
                          <dd className="flex items-center border-b border-neutral-200 p-2 last-of-type:border-none">
                            {song.JOY || ''}
                          </dd>
                        </>
                      )}
                      {(!options.provider || options.provider === 'DAM') && (
                        <>
                          <dt className="flex items-center border-b border-neutral-200 p-2 last-of-type:border-none md:px-4">
                            DAM
                          </dt>
                          <dd className="flex items-center border-b border-neutral-200 p-2 last-of-type:border-none">
                            {song.DAM || ''}
                          </dd>
                        </>
                      )}
                    </dl>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <p>曲が見つかりませんでした。</p>
        )}
      </div>

      <Aside />
    </div>
  )
}

export default App
