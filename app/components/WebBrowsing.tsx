"use client";

import React, { useState, useRef, useEffect } from 'react'
import { TextField, Button } from '@radix-ui/themes'
import { GlobeIcon } from '@radix-ui/react-icons'

function WebBrowsing() {
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	function isValidHttpUrl(string:string) {
		let url;
		
		try {
		  url = new URL(string);
		} catch (_) {
		  return false;  
		}
	  
		return url.protocol === "http:" || url.protocol === "https:";
	}

	const handleSearch = () => {
		let url;
		if (isValidHttpUrl(query)) {
			url = query;
		} else {
			const cleanedQuery = query.replaceAll(" ", "%20")
			url = `https://www.google.com/search?q=${cleanedQuery}`
		}
		
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
		<div className='flex gap-2'>
			<TextField.Root size="3" >
				<TextField.Slot>
					<GlobeIcon height="16" width="16" />
				</TextField.Slot>
				<TextField.Input ref={inputRef} placeholder="Browse the web" size="3" onKeyDown={e => enterKeyPressed(e)} onChange={e => setQuery(e.target.value)}/>
			</TextField.Root>
			<Button className='self-center' onClick={handleSearch} tabIndex={-1}>Search</Button>
		</div>
	)
}

export default WebBrowsing