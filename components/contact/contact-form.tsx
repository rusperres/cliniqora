"use client"

import { Button } from "@/components/ui/button"

export default function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // later: connect Supabase / API route
    const formData = new FormData(e.currentTarget)

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input
          name="email"
          type="email"
          className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Message</label>
        <textarea
          name="message"
          rows={4}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold shadow-md shadow-blue-600/20"
      >
        Send Inquiry
      </Button>
    </form>
  )
}