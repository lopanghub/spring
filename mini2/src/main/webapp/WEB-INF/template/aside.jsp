<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<style>
/* 아래 처럼 .aside *  하시면 제어 가능 */
.aside{
	background-color: #e0e0e0;
	margin:0;
	padding:0;
	width:300px;
	height: 100vh;
	overflow-y: auto;
}

.aside .bi-person-square {
	font-size: 200px;
	line-height: 250px;
	margin-left: 50px;
}

.aside a {
	text-decoration: none;
	color: inherit;
}

.aside .logout {
	font-style: italic;
	text-decoration: underline;
	align-self: center;
}
</style>
<aside class="aside">
	<!--profile-->
	<div class="row border">
		<div class="col ">
			<!-- 기본 이미지  -->
			<i class="bi bi-person-square"></i>
			<p>
				<b>nickname님</b>
			</p>
			<p>안녕하세요!</p>
			<p class="d-flex justify-content-between align-itmes-center">
				<a href="loginForm" class="logout">로그아웃</a> <input type="button"
					class="btn btn-danger ms-auto" value="회원 정보 수정"
					onclick="location.href='updateMemberForm'" />
			</p>

		</div>
	</div>
	<!-- end profile -->

	<!--category -->
	<!-- 각자 본인 사이트에 맞게 수정 -->
	<div class="row">
		<div class="col">
			<p>전체보기</p>
		</div>
	</div>
	<!-- category end -->

	<!-- popluar & recent -->
	<div class="row">
		<div class="col">
			<p>최신글</p>
		</div>
	</div>
	<!-- 최신 댓글  -->
	<div class="row">
		<div class="col">
			<p>최신 댓글</p>
		</div>
	</div>
	<!-- 방문자 수 체크-->
	<div class="row">
		<div class="col">
			<p>전체 방문자수</p>
		</div>
	</div>
</aside>
