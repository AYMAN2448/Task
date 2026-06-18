export const runtime = 'nodejs'   // ⬅️ إجبار البيئة على Node.js

import { handlers } from "@/lib/auth"
export const { GET, POST } = handlers
