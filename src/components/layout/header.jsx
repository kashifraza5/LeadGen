// import { useAuth } from '@/store/auth/authHooks'
import { GlobalSearch } from './global-search'
import { ProfileDropdown } from './profile-dropdown'
import { useSelector } from 'react-redux'
export function Header() {
  const user = useSelector((state) => state.auth.user)
  console.log("🚀 ~ Header ~ user:", user)

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