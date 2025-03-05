<template>
  <Html lang="en">
    <Head>
      <Title>Marketplace</Title>
      <Meta name="description" content="The best marketplace ever!" />
    </Head>
    <Body>
      <div>
        <div>
          <NuxtLayout>
            <div>
              <NuxtPage/>
            </div>
          </NuxtLayout>

          <ClientOnly>
            <LazyShareModal/>
            <LazyProductGalleryModal/>
            <LazyProductCartModal/>
            <LazyUsualModal/>
            <LazyOrderModal/>
          </ClientOnly>
        </div>
      </div>
    </Body>
  </Html>
</template>

<script setup>
  import {getCatalogTree} from "~/composables/catalogState";

  const route = useRoute()

  onMounted(async () => {
    setInterval(() => {
      if (!document.hidden) {
        getCatalogTree()
      }
    },180000)
  })

</script>
