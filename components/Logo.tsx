import Link from "next/link"
import { FC } from "react"

type Props = {
  color:string
}
const Logo:FC<Props> = ({color}) => {
  return (
    <Link href="/" className={`font-extrabold text-xl md:text-4xl text-${color}`}>
        Prosperico
    </Link>
  )
}

export default Logo