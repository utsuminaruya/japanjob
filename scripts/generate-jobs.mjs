import fs from 'node:fs'

const prefs = [
  { areaPref: '東京都', region: '関東', city_ja: '東京都・新宿区', city_vi: 'Quận Shinjuku, Tokyo' },
  { areaPref: '神奈川県', region: '関東', city_ja: '神奈川県・横浜市', city_vi: 'TP. Yokohama, Kanagawa' },
  { areaPref: '愛知県', region: '中部', city_ja: '愛知県・名古屋市', city_vi: 'TP. Nagoya, Aichi' },
  { areaPref: '大阪府', region: '関西', city_ja: '大阪府・大阪市', city_vi: 'TP. Osaka, Osaka' },
  { areaPref: '北海道', region: '北海道', city_ja: '北海道・札幌市', city_vi: 'TP. Sapporo, Hokkaido' }
]

const JLPT = ['不問','N5','N4','N3','N3+','N2','N1']
const SHIFTS = ['日勤のみ','夜勤あり','2交替','3交替','シフト制']

const n = Number(process.argv[2] || 100)

const jobs = Array.from({length:n}, (_,i)=>{
  const p = prefs[i % prefs.length]
  const min = 230000 + (i%40)*1000
  const max = min + 40000 + (i%10)*1000
  const jlpt = JLPT[i % JLPT.length]
  const shift = SHIFTS[i % SHIFTS.length]
  const housing = (i%2===0) ? '寮あり' : '寮なし'
  const tags = [housing, shift, (jlpt==='不問'?'JLPT 不問':`JLPT ${jlpt}`)]

  return {
    id: `job-${(i+1).toString().padStart(4,'0')}`,
    title_ja: `介護スタッフ ${i+1}`,
    title_vi: `Nhân viên chăm sóc ${i+1}`,
    company: `ケアホーム ${(i%50)+1}`,
    ...p,
    salary_monthly_min: min,
    salary_monthly_max: max,
    currency: 'JPY',
    jlpt, shift, housing,
    visa_friendly: true,
    benefits: [],
    tags,
    desc_ja: `入浴・食事・排泄介助（サンプル ${i+1}）`,
    desc_vi: `Hỗ trợ tắm/ăn/vệ sinh (mẫu ${i+1})`,
    sample: false
  }
})

fs.writeFileSync('public/jobs.json', JSON.stringify(jobs, null, 2))
console.log(`generated: public/jobs.json (${n} items)`)
