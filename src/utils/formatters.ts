export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
})

export const relativeTimeFormatter = new Intl.RelativeTimeFormat('en-US', {
    numeric: 'auto',
})

export function formatRelativeTime(date: Date) {
    const now = new Date()
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (secondsAgo < 60) {
        return relativeTimeFormatter.format(-secondsAgo, 'second')
    } else if (secondsAgo < 3600) {
        return relativeTimeFormatter.format(-Math.floor(secondsAgo / 60), 'minute')
    } else if (secondsAgo < 86400) {
        return relativeTimeFormatter.format(-Math.floor(secondsAgo / 3600), 'hour')
    } else {
        return relativeTimeFormatter.format(-Math.floor(secondsAgo / 86400), 'day')
    }
}
