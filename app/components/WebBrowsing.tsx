"use client";

import React, { useState, useRef, useEffect } from 'react'
import { TextField, Button } from '@radix-ui/themes'
import { GlobeIcon } from '@radix-ui/react-icons'

function WebBrowsing() {
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSearch = () => {
		const cleanedQuery = query.replaceAll(" ", "%20")
		const url = `https://www.google.com/search?q=${cleanedQuery}`
		window.open(url, '_blank')!.focus();
	}

	const enterKeyPressed = (e:any) => {
		if (e.key === 'Enter') {
			handleSearch();     
		}
	}

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
		const handleKeyPress = (e:KeyboardEvent) => {
			const isInputFocused = document.activeElement === inputRef.current;
			if (e.key === "Escape" && isInputFocused && inputRef.current) {
				inputRef.current.blur();
				e.preventDefault();
			}
		}

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		}
	}, []);

	return (
		<div className='flex'>
			<TextField.Root size="3" >
				<TextField.Slot>
					<GlobeIcon height="16" width="16" />
				</TextField.Slot>
				<TextField.Input ref={inputRef} placeholder="Browse the web" size="3" onKeyDown={e => enterKeyPressed(e)} onChange={e => setQuery(e.target.value)}/>
			</TextField.Root>
			<Button className='self-center' onClick={handleSearch}>Search</Button>
		</div>
	)
}

export default WebBrowsing