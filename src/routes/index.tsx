import { createFileRoute } from '@tanstack/react-router'

import PersonaBuilder from '@/components/Persona'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
    <PersonaBuilder />
    </div>
  )
}
