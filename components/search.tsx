import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const Search = () => {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input className="lg:w-[500px]" type="text" placeholder="Enter your content..." />
            <Button type="submit">Search</Button>
        </div>
    )
}

export default Search
