import type { Product } from '@/types/product'
import type { Review } from '@/types/review'

const AUTHORS = [
    'Amelia Cole',
    'Noah Patel',
    'Sofia Rahman',
    'Leo Hart',
    'Maya Chen',
    'Owen Brooks',
    'Isla Ward',
    'Kai Mensah',
    'Elena Rossi',
    'Jonah Blake',
    'Priya Shah',
    'Luca Moretti',
    'Hannah Reed',
    'Yusuf Ali',
    'Clara Voss',
]

const COMMENTS = [
    'Exactly as described. The quality feels considered, not cheap.',
    'Arrived quickly and looks even better in person.',
    'A quiet everyday piece. I keep reaching for it.',
    'Not perfect, but still worth the money for the finish.',
    'Packaging was careful and the item matched the photos.',
    'Comfortable, well made, and easy to live with.',
    'I bought a second one after a week. That should say enough.',
    'A little smaller than I expected, but the quality is there.',
    'Clean design. It sits well with the rest of my things.',
    'Would buy again. No fuss, just a solid product.',
]

const MIN_STARS = 1
const MAX_STARS = 5
const DAYS_IN_RANGE = 600
const MS_PER_DAY = 24 * 60 * 60 * 1000
const FIRST_REVIEW_DATE = new Date('2024-01-12')

function createSeededRandom(seed: number) {
    let value = seed

    return function random() {
        value = (value * 16807) % 2147483647
        return value / 2147483647
    }
}

function pickOne<T>(items: T[], random: () => number): T {
    const index = Math.floor(random() * items.length)
    const item = items[index]

    if (!item) {
        throw new Error('Cannot pick from an empty list')
    }

    return item
}

function randomStarRating(averageRate: number, random: () => number) {
    const noise = (random() - 0.5) * 2
    const rawRating = Math.round(averageRate + noise)

    return Math.min(MAX_STARS, Math.max(MIN_STARS, rawRating))
}

function randomReviewDate(random: () => number) {
    const daysAfterStart = Math.floor(random() * DAYS_IN_RANGE)
    const date = new Date(FIRST_REVIEW_DATE.getTime() + daysAfterStart * MS_PER_DAY)

    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}

export function buildReviews(product: Product): Review[] {
    const reviewCount = product.rating?.count ?? 0
    const averageRate = product.rating?.rate ?? 0
    const random = createSeededRandom(product.id)

    return Array.from({ length: reviewCount }, (_, index) => ({
        id: index + 1,
        author: pickOne(AUTHORS, random),
        rating: randomStarRating(averageRate, random),
        body: pickOne(COMMENTS, random),
        date: randomReviewDate(random),
    }))
}
