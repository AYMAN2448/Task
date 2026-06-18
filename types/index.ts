export interface User {
  id: string
  name: string | null
  email: string
  role: 'ADMIN' | 'CLIENT' | 'WORKER'
  available: number
  pending: number
  usdtWallet?: string | null
  momoNumber?: string | null
  cashNumber?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description: string
  reward: number
  status: 'OPEN' | 'IN_PROGRESS' | 'PENDING_REVIEW' | 'COMPLETED' | 'EXPIRED'
  category: 'SOCIAL' | 'MAPS' | 'CUSTOM'
  proofType: 'TEXT' | 'IMAGE'
  proofInstruction?: string | null
  clientId: string
  acceptedWorkerId?: string | null
  createdAt: Date
  expiresAt?: Date | null
}

export interface TaskSubmission {
  id: string
  taskId: string
  workerId: string
  proof: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  reviewedAt?: Date | null
  createdAt: Date
}

export interface Withdrawal {
  id: string
  userId: string
  amount: number
  currency: 'USDT' | 'TRX' | 'SDG_CASH' | 'SSP_MOMO'
  address: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  fee: number
  createdAt: Date
  processedAt?: Date | null
}

export interface Settings {
  rates: {
    usdt: number
    trx: number
    sdgCash: number
    sspMomo: number
  }
  updatedAt: Date
}
