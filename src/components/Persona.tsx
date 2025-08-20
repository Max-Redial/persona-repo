

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bot, Copy, Download } from "lucide-react"

interface PersonaData {
  role: string
  general_guidelines: string
  voice_instructions: string
  style: string
  call_flow_objective: string
  off_scope_questions: string
  user_considerations: string
  closing: string
  voice_gender: string
  language: string
}

export default function PersonaBuilder() {
  const [persona, setPersona] = useState<PersonaData>({
    role: "",
    general_guidelines: "",
    voice_instructions: "",
    style: "",
    call_flow_objective: "",
    off_scope_questions: "",
    user_considerations: "",
    closing: "",
    voice_gender: "",
    language: "",
  })

  const generateSystemPrompt = () => {
    return `ROLE:
${persona.role}

GENERAL GUIDELINES:
${persona.general_guidelines}

VOICE SPECIFIC INSTRUCTIONS:
${persona.voice_instructions}

STYLE:
${persona.style}

CALL FLOW OBJECTIVE:
${persona.call_flow_objective}

OFF SCOPE QUESTIONS:
${persona.off_scope_questions}

USER CONSIDERATIONS:
${persona.user_considerations}

CLOSING:
${persona.closing}

VOICE SETTINGS:
- Gender: ${persona.voice_gender}
- Language: ${persona.language}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSystemPrompt())
  }

  const exportPersona = () => {
    const dataStr = JSON.stringify(persona, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `persona-${Date.now()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">AI Persona Builder</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create AI personas with clear role definitions and conversation guidelines
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role</CardTitle>
                <CardDescription>Define the AI's primary role and identity</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., You are a friendly customer service representative for XYZ Company..."
                  value={persona.role}
                  onChange={(e) => setPersona((prev) => ({ ...prev, role: e.target.value }))}
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General Guidelines</CardTitle>
                <CardDescription>Overall behavior and approach guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Always be polite and professional. Listen actively to customer concerns..."
                  value={persona.general_guidelines}
                  onChange={(e) => setPersona((prev) => ({ ...prev, general_guidelines: e.target.value }))}
                  rows={4}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voice Specific Instructions</CardTitle>
                <CardDescription>How the AI should speak and communicate</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Speak clearly and at a moderate pace. Use a warm, welcoming tone..."
                  value={persona.voice_instructions}
                  onChange={(e) => setPersona((prev) => ({ ...prev, voice_instructions: e.target.value }))}
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Style</CardTitle>
                <CardDescription>Communication style and personality traits</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Conversational yet professional. Empathetic and solution-focused..."
                  value={persona.style}
                  onChange={(e) => setPersona((prev) => ({ ...prev, style: e.target.value }))}
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Call Flow Objective</CardTitle>
                <CardDescription>Primary goals and desired outcomes for conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Resolve customer issues efficiently while maintaining satisfaction..."
                  value={persona.call_flow_objective}
                  onChange={(e) => setPersona((prev) => ({ ...prev, call_flow_objective: e.target.value }))}
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Off Scope Questions</CardTitle>
                <CardDescription>How to handle questions outside the AI's expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., If asked about topics outside your expertise, politely redirect to appropriate resources..."
                  value={persona.off_scope_questions}
                  onChange={(e) => setPersona((prev) => ({ ...prev, off_scope_questions: e.target.value }))}
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Considerations</CardTitle>
                <CardDescription>Important factors to consider about users</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Users may be frustrated or confused. Be patient and understanding..."
                  value={persona.user_considerations}
                  onChange={(e) => setPersona((prev) => ({ ...prev, user_considerations: e.target.value }))}
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Closing</CardTitle>
                <CardDescription>How to end conversations appropriately</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Always thank the user and offer additional assistance before ending..."
                  value={persona.closing}
                  onChange={(e) => setPersona((prev) => ({ ...prev, closing: e.target.value }))}
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voice Settings</CardTitle>
                <CardDescription>Configure voice characteristics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="voice_gender">Voice Gender</Label>
                    <Select
                      value={persona.voice_gender}
                      onValueChange={(value) => setPersona((prev) => ({ ...prev, voice_gender: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={persona.language}
                      onValueChange={(value) => setPersona((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

         
        <Button>Generate Persona</Button>
        </div>
      </div>
    </div>
  )
}
