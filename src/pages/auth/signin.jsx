import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
	Box,
	Button,
	Grid,
	Heading,
	VStack,
	FormLabel,
	Input,
	chakra,
    Divider,
    Flex,
    Text,
} from '@chakra-ui/react'
import { useSession, signIn } from 'next-auth/react'

import { BsGithub, BsTwitter, BsGoogle } from 'react-icons/bs'

const providers = [
	{
		name: 'github',
		Icon: BsGithub,
	},
	{
		name: 'twitter',
		Icon: BsTwitter,
	},
	{
		name: 'google',
		Icon: BsGoogle,
	},
]

const Signin = () => {
	const { data: session, status } = useSession()
	const { push } = useRouter()
	const [email, setEmail] = useState('')

	console.log(session)
	if (status === 'loading') return <Heading>Checking Authentication...</Heading>

	if (session) {
		setTimeout(() => {
			push('/')
		}, 3000)

		return <Heading>you are already signed in</Heading>
	}

	const handleOAuthSignIn = (provider) => () => signIn(provider)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!email) return false

		signIn('email', { email, redirect: false })
	}

	return (
		<Box>
			<chakra.form onSubmit={handleSubmit}>
				<FormLabel>Email Address</FormLabel>
				<Input
					value={email}
					type='email'
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Button type='submit' w='100%' mt={5}>
					Login
				</Button>
			</chakra.form>
            <Flex alignItems='center' my={2}>
            <Divider mt={1} />
            <Text mx={2}>or</Text>
            <Divider mt={1}/>
            </Flex>
			<VStack>
				{providers.map(({ name, Icon }) => (
					<Button
						key={name}
						leftIcon={<Icon />}
						onClick={handleOAuthSignIn(name)}
						textTransform='uppercase'
						w='100%'
					>
						Sign in with {name}
					</Button>
				))}
			</VStack>
		</Box>
	)
}

export default Signin