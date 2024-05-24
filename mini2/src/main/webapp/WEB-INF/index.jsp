<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Insert title here</title>
<link href="resources/bootstrap/bootstrap.min.css" rel="stylesheet">
<link href="resources/css/member.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<script src="resources/js/jquery-3.7.1.min.js"></script>
<script src="resources/js/member.js"></script>
</head>
<body>
	<div class="container">
	\
		<div class="row">
			<aside class="col-md-3 p-0">
				<%@ include file="template/aside.jsp" %>
			</aside>
			<main class="col-9 p-3">
				<jsp:include page="${param.body}" />
			</main>
		</div>
	</div>

	<script src="resources/bootstrap/bootstrap.bundle.min.js"></script>
</body>
</html>