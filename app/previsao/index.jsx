import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppContext } from '../../scripts/appContext'

const telaPrevisao = () => {
    const { cidade } = useContext(AppContext)
    const [tempo, setTempo] = useState(null)

    const obterPrevisaoDoTempo = async () => {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=bddbeed6a893cf7d820e74ae7f9cb95e&units=metric&lang=pt`)
            const data = await response.json()
 
            if (data && data.main) {
                setTempo({
                    nome: data.name,
                    temperatura: data.main.temp,
                    vento: data.wind.speed,
                    umidade: data.main.humidity,
                    clima: data.weather[0].description
                })
            }
        } catch (error) {
            console.error("Erro ao obter dados do tempo:", error)
        }
    }

    useEffect(() => {
        obterPrevisaoDoTempo()
    }, [])

    return (
        <View style={styles.container}>
            {tempo ? (
                <View style={styles.tempoView}>
                    <Text style={styles.texto}>Cidade: {tempo.nome}</Text>
                    <Text style={styles.texto}>Temperatura: {tempo.temperatura}°C</Text>
                    <Text style={styles.texto}>Velocidade do Vento: {tempo.vento} m/s</Text>
                    <Text style={styles.texto}>Umidade: {tempo.umidade}%</Text>
                    <Text style={styles.texto}>Clima: {tempo.clima}</Text>
                </View>
            ) : (
                <Text style={styles.texto}>Carregando previsão do tempo...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default telaPrevisao
