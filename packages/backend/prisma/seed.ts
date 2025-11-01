import prisma from '../src/config/prisma'



async function main() {


  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      uid: '1cTPVR9N0ne93iWsDRz3azh1qdg2',
      email: 'alice@prisma.io',
      emailVerified: true,
      displayName: 'Alice',
      isAnonymous: false,
      photoURL: "https://lh3.googleusercontent.com/a/ACg8ocLxM0aGu72YfX9HknwtW0PRniJjtPy205bf6MzpirnOhP-3=s96-c",
      createdAt: "1708036109750",
      lastLoginAt: "1708161971329",
      prompts: {
        create: {
          title: 'Social Media Content Generator',
          content: `As a top creative social media strategist, come up with a social media content for a business whose name is {{Business Name}} in {{industry}} industry and located in {{location}}.
Rules for Content Generation:
The content must be related to  the campaign objective: {{Campaign Objective}}
The content should be generated in {{language}} language
The content should use the local lingo of the location of the business
The content should be in the {{tone}} tone
The content should have word length of {{word length}} words`,
          slug: "marketing-content-generator-1698089360",
          publish_status: false,
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io', },
    update: {},
    create: {
      uid: '1cTPVR9N0ne93iWsDRz3azh1qdg3',
      email: 'bob@prisma.io',
      emailVerified: true,
      displayName: 'Alice',
      isAnonymous: false,
      photoURL: "https://lh3.googleusercontent.com/a/ACg8ocLxM0aGu72YfX9HknwtW0PRniJjtPy205bf6MzpirnOhP-3=s96-c",
      createdAt: "1708036109750",
      lastLoginAt: "1708161971329",
      prompts: {
        create: [
          {
            title: 'Marketing Content Generator',
            content: 'Generate a marketing content with great {{content}}',
            slug: "marketing-content-generator-1698089359",
            publish_status: false,
          },
        ],
      },
    },
  })


  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
