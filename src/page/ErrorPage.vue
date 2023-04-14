<template>
  <div class="error-wrapper">
    <p>
      404: Page not found, but don't worry - there are plenty of other pages in
      this book
    </p>
    <img src="../assets/Layer2.png" />
  </div>
</template>

<style>
.error-wrapper {
  display: flex;
  flex-direction: column;
  height: 50vh;
  align-items: center;
}
.error-wrapper p {
  font-size: 24px;
  padding: 0px 10px;
  color: var(--primary-clr);
}
.error-wrapper img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
