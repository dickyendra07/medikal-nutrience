"use client";

import { AssessmentIcon } from "./AssessmentIcon";

type Props = {
  title:string;
  description?:string;
  icon?:string;
  onClick:()=>void;
};

export function AssessmentOptionCard({
  title,
  description,
  icon="medical",
  onClick,
}:Props){

return (
<button
onClick={onClick}
className="
group
w-full
rounded-[1.75rem]
border
border-slate-200
bg-white
p-5
text-left
transition
duration-300
hover:-translate-y-1
hover:border-[#006b3f]
hover:shadow-lg
"
>

<div
className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-[#e5f7ee]
"
>
<AssessmentIcon name={icon}/>
</div>

<h3 className="
mt-4
text-lg
font-black
text-[#111827]
">
{title}
</h3>

{description && (
<p className="
mt-2
text-sm
leading-6
text-slate-500
">
{description}
</p>
)}

<div className="
mt-4
text-xs
font-black
text-[#006b3f]
opacity-0
transition
group-hover:opacity-100
">
Pilih →
</div>

</button>
)

}
