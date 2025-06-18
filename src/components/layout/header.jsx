import { useAuth } from '@/components/auth/auth-provider'
import { GlobalSearch } from './global-search'
import { ProfileDropdown } from './profile-dropdown'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center space-x-4 w-full flex justify-between">
          <GlobalSearch />
          <ProfileDropdown user={user} />
        </div>
      </div>
    </header>
  )
} 