import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";


import prisam from '@/app/libs/prismadb';

interface Iparams {
    listingId?: string;
}

export async function POST(request: Request, { params }: {  params: Iparams }) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error()
    }

    const { listingId } = params

    if(!listingId || typeof listingId !== 'string') {
        throw new Error("Invalid Id")
    } 

    let favIds = [...(currentUser.favoriteIds) || []]


    favIds.push(listingId);

    const user = await prisma?.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favIds
        }
    })

    return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: {params: Iparams}) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }


    const { listingId } = params;

    if(!listingId || typeof listingId !== 'string') {
        throw new Error('invalid id')
    }


    let favIds = [...(currentUser.favoriteIds) || []];


    favIds = favIds.filter((id) => id !== listingId) 

    const user = await prisma?.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favIds
        }
    })

    return NextResponse.json(user);
}

