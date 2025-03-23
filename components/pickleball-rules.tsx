"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PickleballRules() {
  const [activeTab, setActiveTab] = useState("basics")

  return (
    <Card className="shadow-lg border-2 border-blue-100">
      <CardHeader>
        <CardTitle>Official Pickleball Rules</CardTitle>
        <CardDescription>Learn how to play pickleball with these official rules and guidelines</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="scoring">Scoring</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="basics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">The Court</h3>
                    <p className="text-slate-700 mb-4">
                      A pickleball court is 20 feet wide and 44 feet long, similar to a badminton court. The net is 36
                      inches high at the sidelines and 34 inches high in the middle.
                    </p>

                    <h3 className="text-xl font-semibold mb-3">Equipment</h3>
                    <p className="text-slate-700">
                      Players use solid paddles made of wood or composite materials and a perforated plastic ball
                      similar to a wiffle ball.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Basic Rules</h3>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Serving Rules</AccordionTrigger>
                        <AccordionContent>
                          Serves must be made underhand, with the paddle below the waist. The server must keep both feet
                          behind the baseline during the serve, and the serve must be made diagonally to the opponent's
                          service court.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>The Two-Bounce Rule</AccordionTrigger>
                        <AccordionContent>
                         When the ball is served, the receiving team must let it bounce before returning, and then the serving team must let it bounce before returning. After these two bounces, players can either volley the ball or play it off a bounce.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>The Non-Volley Zone (Kitchen)</AccordionTrigger>
                        <AccordionContent>
                          The 7-foot zone on either side of the net is called the "kitchen" or non-volley zone. Players
                          cannot volley the ball while standing in this zone or touching the line.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scoring" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Scoring System</h3>
                    <p className="text-slate-700 mb-4">
                      Games are typically played to 11 points and must be won by 2 points. Only the serving team can
                      score points.
                    </p>

                    <h3 className="text-xl font-semibold mb-3">Calling the Score</h3>
                    <p className="text-slate-700">
                      In doubles, the score is called as three numbers: the serving team's score, the receiving team's
                      score, and the server number (1 or 2).
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Faults</h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                      <li>Hitting the ball out of bounds</li>
                      <li>Not clearing the net</li>
                      <li>Stepping into the non-volley zone when volleying</li>
                      <li>Volleying the ball before it has bounced once on each side</li>
                      <li>Touching the net with your paddle or body</li>
                      <li>Hitting the ball twice before it crosses the net</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Strategy Tips</h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                      <li>Keep the ball low over the net</li>
                      <li>Aim for the opponent's feet</li>
                      <li>Move to the non-volley zone line as quickly as possible</li>
                      <li>Use the "third shot drop" to neutralize the opponent's advantage</li>
                      <li>Communicate with your partner in doubles</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Common Terms</h3>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="term-1">
                        <AccordionTrigger>Dink</AccordionTrigger>
                        <AccordionContent>
                          A soft shot hit from the non-volley zone that arcs over the net and lands in the opponent's
                          non-volley zone.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="term-2">
                        <AccordionTrigger>Kitchen</AccordionTrigger>
                        <AccordionContent>
                          Another name for the non-volley zone, the 7-foot area on each side of the net.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="term-3">
                        <AccordionTrigger>Erne</AccordionTrigger>
                        <AccordionContent>
                          An advanced shot where a player positions themselves outside the sideline of the non-volley
                          zone to hit a volley while avoiding the non-volley zone restrictions.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  )
}

