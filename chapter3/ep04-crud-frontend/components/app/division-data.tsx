import { DivisionListItem } from "@/lib/dto/division.dto";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";

export default function DivisionView({list} : {list : DivisionListItem[]}) {

    return (
        <section className="grid grid-cols-3 gap-4">
        {list.map(item => 
            <DivisionItem key={item.id} item={item} />
        )}
        </section>
    )
}

function DivisionItem({item} : {item : DivisionListItem}) {
    return (
        <Item variant={'outline'}>
            <ItemMedia>{item.id}</ItemMedia>

            <ItemContent>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemDescription>{item.region}</ItemDescription>
            </ItemContent>
        </Item>
    )
}