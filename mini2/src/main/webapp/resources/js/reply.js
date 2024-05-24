$(function(){
	$("#replyWrite").on("click", function(){
		if($("#replyForm").is(":visible")) {
			//댓글 쓰기 폼이 보이고 댓글쓰기 위치가 아니면
			//댓글 쓰기 위치로 이동 시키기 
			var $prev = $("#replyTitle").prev();
			if(!$prev.is("#replyForm")) {
				$("#replyForm").slideUp(300);
			}
			setTimeout(function(){
				$("#replyForm").insertBefore("#replyTitle").slideDown(300);
			},300);
		} else { //댓글 쓰기폼이 안보이는 상태
			$("#replyForm").removeClass("d-none")
				.css("display", "none").insertBefore("#replyTitle").slideDown(300);
		}
		
		// 업데이트폼과 라이트폼을 동적으로 쓰기때문에 댓글 수정에 필요한 data-no는 삭제 
		$("#replyForm").find("form").attr("id", "replyWriteForm").removeAttr("data-no");
		$("#replyContent").val("");
		$("#replyWriteButton").val("댓글 쓰기");
	});
	// 댓글 쓰기 폼 서브밋 될때
	$(document).on("submit", "#replyWriteForm", function(e){
		if($("#replyContent").val().length<5) {
			alert("댓글은 5자 이상 입력해주세요.")
			return false;
		}
		
		let params = $(this).serialize();
		console.log(params);
		return false;
	});
	
	
	$(".btnCommend").click(function(){
		var com = $(this).attr("id");
		console.log("com : "+com);
		
		$.ajax({
			url : "recommend.ajax",
			type : "post",
			data : {recommend : com, no :$("#no").val()},
			dataType : "json",
			success : function(resData){
				console.log(resData)
				$("#commend > .recommend").text("("+resData.recommend+")")
				$("#thank > .recommend").text("("+resData.thank+")")
				
				let msg = com == 'commend' ? '추천이' : '땡큐가';
				alert(msg + " 반영 되었습니다.");		
			},
			error:function(xhr, status, error){
				console.log("error : "+xhr.statusText+", " + status + ", "+ error);
			}
		});
		
	});
	
});