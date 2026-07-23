"use client";

export function AssessmentProgress({
step,
total=5,
}:{
step:number;
total?:number;
}){

const percentage=Math.round((step/total)*100);

return (
<div className="mb-6">

<div className="
mb-2
flex
justify-between
text-xs
font-black
text-[#006b3f]
">
<span>PROGRESS ASSESSMENT</span>
<span>{percentage}%</span>
</div>

<div className="
h-2
overflow-hidden
rounded-full
bg-[#e5f7ee]
">

<div
className="
h-full
rounded-full
bg-gradient-to-r
from-[#006b3f]
to-[#10b981]
transition-all
"
style={{
width:`${percentage}%`
}}
/>

</div>

</div>
)

}
