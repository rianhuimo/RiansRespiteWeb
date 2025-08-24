"use client"
import React, { ChangeEvent, useEffect, useState } from 'react';
import Form from 'next/form'
import axios from "axios"

function DictionaryGame() {

    const [word, setWord] = useState("")
    const [definition, setDefinition] = useState([])
    const [scores, setScores] = useState([])
    const [userDefinition, setUserDefinition] = useState("")

    useEffect(() => {
        getWord()
    }, [])

    useEffect(() => {
        console.log(definition)
    }, [definition])

    async function getWord() {
        try {
            const response = await axios.get("http://localhost:8000/api/word");
            setWord(response.data.word);
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    }

    async function getDefinitionScore(e: React.SyntheticEvent) {
        e.preventDefault()
        if (word === "") return // make sure that the request only happens if a word is loaded in. Otherwise it...wouldn't make sense...
        const target = e.target as typeof e.target & {
            user_definition: { value: string };
        };
        const user_definition = target.user_definition.value
        console.log(`User entered definition: ${user_definition}`)
        try {
            const dictionary_word = word.trim()
            const response = await axios.post("http://localhost:8000/api/definition-score", {
                "word": dictionary_word,
                "user_definition": user_definition
            }).then(function (response) {
                const data = response.data
                setDefinition(data.dictionary_definitions);
                setScores(data.scores)
            })
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    }

    function handleChange (event:ChangeEvent<HTMLTextAreaElement>) {
        setUserDefinition(event.target.value);
    };

    return (
        <div className='min-h-full justify-center w-full bg-linen text-dune'>

            <div className='m-auto w-xl font-[calamity] text-center relative top-2/12 p-4 grid grid-cols-1 gap-4'>
                <p className='text-5xl'>Dictionary game!</p>
                <p>The word is: {word}</p>

                <form onSubmit={getDefinitionScore}>
                    <textarea name="user_definition" rows={5} cols={40} className='border-(--color-cardboard) border-2 block p-1 w-full'
                        placeholder={`Guess the meaning of the word: ${word}`}
                        onChange={handleChange} value={userDefinition}/>
                    <button type="submit" className={`${!(userDefinition === "") ? "bg-sand text-dune": "text-dune"} px-1.5 my-1.5 block`} disabled={userDefinition === ""}>
                        Submit 
                        {userDefinition === "" ? " 🌚" : " 🥺"}
                    </button>
                </form>

                <p className='text-3xl'>Results</p>
                <div className='text-left'>
                    <p>Dictionary definition: </p>
                    <hr className=' border-1' />
                    {definition.map((item, index) => {
                        return (
                            <p key={index}>{index + 1}. {item}</p>
                        )
                    })}

                    <p className='mt-4'>Your definition: </p>
                    <hr className=' border-1' />
                    <p>{userDefinition}</p>

                    <p className='mt-4'>Score</p>
                    <hr className=' border-1' />
                    {scores.map((item, index) => {
                        return (
                            <p key={index}>{index + 1}. {item}</p>
                        )
                    })}
                </div>

            </div>
        </div>
    );
}

export default DictionaryGame;