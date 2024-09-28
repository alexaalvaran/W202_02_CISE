import React from "react";
import { Article } from "@/components/articles/Article";
import { Body, 
    Container,
    Button,
    Head, 
    Heading, 
    Html, 
    Preview, 
    Tailwind,
    Text } 
    from "@react-email/components";

export default function newArticle() {
    return(
        <Html>
            <Head />
            <Preview>New update to SPEED app</Preview>
            <Tailwind>
                <Body className='bg-white text-black font-sans'>
                    <Container className='mt-8 border border-black p-10 mx-auto'>
                        <Heading>You got new articles to review!</Heading>
                       <Text> 
                        You have new articles waiting to be reviewed. Please login and check.
                       </Text>
                       <Button
                        href="/login"
                        className='big-blue-700 text-black px=4 py-2'
                        >
                        Go to App
                       </Button>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}