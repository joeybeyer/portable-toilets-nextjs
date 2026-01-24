import Image from 'next/image'
import { AuthorInfo } from '@/data/types'

interface AuthorBoxProps {
  author: AuthorInfo
}

export default function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <div className="my-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border-2 border-teal-500"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-navy-900">{author.name}</h3>
          {author.credentials && author.credentials.length > 0 && (
            <div className="flex flex-wrap gap-2 my-2">
              {author.credentials.map((cred, i) => (
                <span
                  key={i}
                  className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full"
                >
                  {cred}
                </span>
              ))}
            </div>
          )}
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">{author.bio}</p>
          {author.socialLinks && Object.keys(author.socialLinks).length > 0 && (
            <div className="flex gap-4 mt-3">
              {author.socialLinks.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                >
                  LinkedIn
                </a>
              )}
              {author.socialLinks.twitter && (
                <a
                  href={author.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                >
                  Twitter
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
