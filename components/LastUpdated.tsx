interface LastUpdatedProps {
  date: string
  prefix?: string
  className?: string
}

export default function LastUpdated({
  date,
  prefix = 'Last updated',
  className = ''
}: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <span className={`text-gray-500 text-sm ${className}`}>
      {prefix}{' '}
      <time dateTime={date} className="font-medium">
        {formattedDate}
      </time>
    </span>
  )
}
