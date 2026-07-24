import { FeatureGridSection } from "@/components/shared/FeatureGridSection";
import { supportItems } from "@/data/support-system";

export function SupportSystem(){

  return (
    <FeatureGridSection
      eyebrow="Support System"
      title="Pendamping Nutrisi Untuk Perjalanan Anda"
      description="
      Berbagai fitur edukasi, informasi, dan dukungan
      untuk membantu menjaga kesehatan Anda.
      "
      introButton="Lihat Support System"
      introHref="/support-system"
      items={
        supportItems.map((item)=>({
          title:item.title,
          description:item.description,
          href:`/support-system/${item.slug}`,
          color:item.color,
          soft:item.soft,
        }))
      }
    />
  );
}
