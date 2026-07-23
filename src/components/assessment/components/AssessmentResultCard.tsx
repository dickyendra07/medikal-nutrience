"use client";

type Props={
result:any;
image:string;
onClose:()=>void;
};

export function AssessmentResultCard({
result,
image,
onClose,
}:Props){

return (
<div className="
rounded-[2rem]
bg-white
p-6
shadow-xl
">

<img
src={image}
alt={result.product}
className="
mx-auto
h-48
object-contain
"
/>

<h2 className="
mt-6
text-3xl
font-black
text-[#111827]
">
{result.product}
</h2>

<p className="
mt-3
text-sm
leading-6
text-slate-500
">
{result.note}
</p>

<div className="mt-5 space-y-3">

{result.benefits.map((item:string)=>(
<div
key={item}
className="
rounded-xl
bg-[#f5faf7]
p-3
text-sm
font-bold
"
>
✓ {item}
</div>
))}

</div>

<div className="mt-6 flex gap-3">

<a
href={result.ctaUrl}
className="
flex-1
rounded-full
bg-[#006b3f]
py-3
text-center
text-sm
font-black
text-white
"
>
Lihat Produk
</a>

<button
onClick={onClose}
className="
flex-1
rounded-full
border
border-[#006b3f]
py-3
text-sm
font-black
text-[#006b3f]
"
>
Tutup
</button>

</div>

</div>
)

}
