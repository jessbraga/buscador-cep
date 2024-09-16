import { AlertCircle } from "lucide-react"

import {Alert,AlertDescription,AlertTitle} from "@/components/ui/alert"

export function AlertError() {
  return (
    <Alert variant="destructive" style={{position: "absolute", width: "15rem", backgroundColor: "#E35335", color: "white", marginBottom: "15rem"}}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        O CEP informado é inválido. 
      </AlertDescription>
    </Alert>
  )
}
