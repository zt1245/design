<template>
  <div class="i_nav">
		<div class="nav_content container">
			<h1>
				<a href="/" class="logo">i-dessert</a>
			</h1>
			<ul>
				<li>首页</li>
				<li>首页</li>
				<li>首页</li>
				<li>首页</li>
				<li>首页</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.nav_content {
	display: flex;
	justify-content: space-between;
	.logo {
		width: 110px;
		height: 75px;
		display: block;
		background: url(../../../static/images/logo.jpg);
		text-indent: -9999px;
	}
	ul {
		display: flex;
		li {
			padding: 0 20px;
			line-height: 75px;
		}
	}
}
</style>
