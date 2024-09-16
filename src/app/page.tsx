'use client'

import * as React from "react" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import axios from 'axios';
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { AlertError } from "@/components/Alert"

export default function Home() {

  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('none');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);

  const getCPF = async () => {

    if (input!= '') {
  
    const res = await axios({
      method: "get",
      url: `https://api.brasilaberto.com/v1/zipcode/${input}`,
      responseType: "stream",
    }).then(function (response) {
      console.log(response)
      let data = JSON.parse(response.data);
      setRua(data.result.street);
      setBairro(data.result.district);
      setCidade(data.result.city);
      setEstado(data.result.state);
      setDisplay('');
    }).catch(function (error){
      setVisibleAlert(true);
      console.log("verifique o erro");
      setDisplay('none');
      setTimeout(() => {
      setVisibleAlert(false);
    }, 2000);
    });
  
    }

  }

  return (
    
    <main style = {{alignItems: "center",  display: "flex", justifyContent: "center", height: "100vh", gap: "1rem"}}>
      {visibleAlert && <AlertError/>}
      <Card className="w-[400px]" >
        <div style={{alignItems: "center", justifyContent: "center"}}>
        <CardHeader>
          <CardTitle>Buscador de CEP</CardTitle>
          <CardDescription>Informe o CEP para receber detalhes da localidade.</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{display: "flex", gap: "1rem"}}>
            <Input id="name" placeholder="" value={input} onChange={e => setInput(e.target.value)}/>
            <Button onClick={() => getCPF()}><Search style={{color: "white"}}/></Button>
          </div>
        </CardContent>
      </div>
    </Card>
    <Card className="w-[400px]" style={{display: display, gap: "1rem", position: "absolute", marginTop: "18rem"}}>
      <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem"}}>
        <Label>Rua/Avenida: {rua}</Label>
        <Label>Bairro: {bairro}</Label>
        <Label>Cidade: {cidade}</Label>
        <Label>Estado: {estado}</Label>
      </div>
    </Card>
  </main>
  );
}
