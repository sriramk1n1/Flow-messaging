import { redirect } from "@sveltejs/kit"

export const load = async ({request, cookies }) => {
    cookies.delete("access")
    throw redirect(302,"/login")
}