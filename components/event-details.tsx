"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function EventDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-red-600">TEDx</span> Pickleball Pop-up Event
        </h1>
        <p className="text-lg text-slate-700">
          Join us for an exciting pickleball event sponsored by PaddleX | The Pickleball Club. Watch players compete,
          learn the game, and enjoy the TEDx experience!
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-red-600" />
            <span className="font-medium">March 24, 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-600" />
            <span className="font-medium">11:00 AM - 4:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-600" />
            <span className="font-medium">Basketball Court</span>
          </div>
        </div>

        <div className="pt-4">
          <a
            href="#leaderboard"
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 transition-colors"
          >
            View Leaderboard
          </a>
        </div>
      </motion.div>
      <div>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdkFB77K2DkNxRQsg4RlHOHwkj3mtWNQ3sfSZ6otA8rHhttRg/viewform?usp=send_form"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-5xl block text-center text-white text-4xl font-extrabold py-6 px-8 bg-red-500 rounded-lg shadow-lg animate-pulse">
            🎉 FREE COUPON
        </a>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden border-2 border-blue-100 shadow-lg">
  <CardContent className="p-0">  
    <iframe
      className="w-full aspect-video"
      src="https://www.youtube.com/embed/JMwKyO4-WYU"
      title="Pickleball Video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </CardContent>
</Card>

      </motion.div>
    </div>
  )
}

