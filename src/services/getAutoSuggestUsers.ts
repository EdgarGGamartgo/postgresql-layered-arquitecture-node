import { User, UserAttrs } from '../models/User'


export const getAutoSuggestUsers = (loginSubstring: string, limit: number): UserAttrs[] => {
    const loginSubstringDate = loginSubstring.substring(0, 4)
    const users: UserAttrs[] = User.filter(u =>{
        const uSunbstring = u.login.substring(0, 4)
        return uSunbstring === loginSubstringDate && !u.isDeleted 
    })
    let usersLimit: UserAttrs[] = [] 
    for (var i = 0; i < users.length; i++) {

        if (limit === 0) {
            return []
        }

        if (i >= limit) {
            break
        }

        usersLimit.push(users[i])
    }
    if (usersLimit.length === 0) {
        throw new Error('No users  for that login filter')
    } else {
        return usersLimit
    }
}

export const sortByLogin = (sort: string, filteredUsers: UserAttrs[]): UserAttrs[] => {
    let users: UserAttrs[] = []
    if (filteredUsers.length === 0) {
        return []
    }
    if (sort === 'oldest') {
        users = filteredUsers.sort((a, b) => -a.login.localeCompare(b.login)) // Sorting by Newest first
    } else if (sort === 'newest') {
        users = filteredUsers.sort((a, b) => a.login.localeCompare(b.login)) // Sorting by Oldest first
    }
    return users
}