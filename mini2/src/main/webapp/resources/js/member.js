$(function() {
    console.log("jQuery version: " + $.fn.jquery);
    console.log("Document is ready");

    // 회원 정보 수정폼에서 비밀번호 확인 버튼이 클릭될 때 이벤트 처리
    $("#btnPassCheck").click(function() {
        var oldId = $("#id").val();
        var oldPass = $("#oldPass").val();
        if ($.trim(oldPass).length == 0) {
            alert("기존 비밀번호가 입력되지 않았습니다.\n기존 비밀번호를 입력해주세요");
            return false;
        }
        var data = "id=" + oldId + "&pass=" + oldPass;
        console.log("data : " + data);
        
        $.ajax({
        	url : "passCheck.ajax",
        	type : "get",
        	data : data,
        	dataType : "json",
        	success : function(resData){
        		if(resData.result) {
        			alert("비밀번호가 확인되었습니다.")
        			$("#btnPassCheck").prop("disabled", true);
        			$("#oldPass").prop("readonly", true);
        			$("#pass1").focus();
        		} else {
        			alert("비밀번호가 다릅니다.");
        			$("#oldPass").val("").focus();
        		}
        	},
        	error : function(){
        		console.log("error");
        	}
        	
        })
    });
    
    // 회원 정보 수정 폼에서 수정하기 버튼이 클릭되면 유효성 검사를 하는 함수
    $("#memberUpdateForm").on("submit", function(){
    	// 비밀번호 확인버튼이 disabled가 아닐시 경고창
    	if(!$("#btnPassCheck").prop("disabled")) {
    		alert("비밀번호 확인 버튼을 눌러주세요")
    		return false;
    	}
    	return joinFormCheck();
  
    });

    // 회원 가입 폼
    $("#joinForm").on("submit", function() {
    	let isIdCheck = $("#isIdCheck").val();

        // 중복검사 통과 여부
        if (isIdCheck == 'false') {
            alert("아이디 중복검사를 하지 않았습니다.");
            return false;
        }
    	
    	return joinFormCheck();
    });

    // 이메일 도메인 셀렉트 박스 선택
    $("#selectDomain").on("change", function() {
        let str = $(this).val();
        const domainMapping = {
            '네이버': 'naver.com',
            '다음': 'daum.net',
            '한메일': 'hanmail.net',
            '구글': 'gmail.com'
        };

        if (str === '직접입력') {
            $("#emailDomain").val("");
            $("#emailDomain").attr("readonly", false);
            $("#emailDomain").focus();
        } else {
            $("#emailDomain").val(domainMapping[str]);
            $("#emailDomain").attr("readonly", true);
        }
    });

    // 우편번호 찾기 버튼이 클릭되면 - 다음 우편번호 찾기 실행
    $("#btnZipcode").click(findZipcode);

    // 아이디 중복 폼이 서브밋 될 때
    $("#idCheckForm").on("submit", function() {
        let id = $("#checkId").val();
        if (id.length == 0) {
            alert("아이디를 입력해주세요");
            return false;
        }
        if (id.length < 5) {
            alert("아이디는 5자 이상이어야 합니다.");
            return false;
        }
    });

    // 아이디 사용하기 버튼이 클릭되면
    $("#btnIdCheckClose").on("click", function() {
        let id = $(this).attr("data-id-value");
        opener.document.joinForm.id.value = id;
        opener.document.joinForm.isIdCheck.value = true;
        window.close();
    });

    $("#btnOverlapId").on("click", function() {
        let id = $("#id").val();
        if (id.length == 0) {
            alert("아이디를 입력해 주세요");
            return false;
        }
        if (id.length < 5) {
            alert("아이디는 5자 이상이어야 합니다.");
            return false;
        }

        let url = "overlapIdCheck?id=" + id;
        window.open(url, "_blank", "width=500, height=400");
    });

    $("#id").on("keyup", function() {
        let regExp = /[^A-Za-z0-9]/gi;
        if (regExp.test($(this).val())) { // 영문 대소문자, 숫자가 아니면
            alert("아이디는 영문 대소문자와 숫자만 가능합니다.");
            $(this).val($(this).val().replace(regExp, ""));
        }
    });

    $("#pass1").on("keyup", inputCharReplace);
    $("#pass2").on("keyup", inputCharReplace);
    $("#emailId").on("keyup", inputCharReplace);
    $("#emailDomain").on("keyup", inputEmailDomainReplace);

    // 모달 로그인 폼
    $("#modalLoginForm").on("submit", function() {
        let id = $("#userId").val();
        let pass = $("#userPass").val();

        if (id.length <= 0) {
            alert("아이디를 입력해주세요");
            $("#userId").focus();
            return false;
        }
        if (pass.length <= 0) {
            alert("비밀번호를 입력해주세요");
            $("#userPass").focus();
            return false;
        }
    });

    // 로그인 폼 유효성 검사
    $("#loginForm").on("submit", function() {
        let id = $("#userId").val();
        let pass = $("#userPass").val();

        if (id.length <= 0) {
            alert("아이디를 입력해주세요");
            $("#userId").focus();
            return false;
        }
        if (pass.length <= 0) {
            alert("비밀번호를 입력해주세요");
            $("#userPass").focus();
            return false;
        }
    });
});

function joinFormCheck() {
	 // 입력 필드 변수 설정
    let fields = [
        { id: "#name", message: "이름이 입력되지 않았습니다." },
        { id: "#id", message: "아이디는 5자 이상이어야 합니다.", minLength: 5 },
        { id: "#pass1", message: "비밀번호가 입력되지 않았습니다." },
        { id: "#pass2", message: "비밀번호 확인이 입력되지 않았습니다." },
        { id: "#zipcode", message: "우편번호가 입력되지 않았습니다." },
        { id: "#address1", message: "주소가 입력되지 않았습니다." },
        { id: "#emailId", message: "이메일 아이디가 입력되지 않았습니다." },
        { id: "#emailDomain", message: "이메일 도메인이 입력되지 않았습니다." },
        { id: "#mobile2", message: "휴대폰 번호가 입력되지 않았습니다." },
        { id: "#mobile3", message: "휴대폰 번호가 입력되지 않았습니다." }
    ];

    

    // 필드 유효성 검사
    for (let field of fields) {
        let value = $(field.id).val().trim();
        if (value.length == 0 || (field.minLength && value.length < field.minLength)) {
            alert(field.message);
            return false;
        }
    }

    // 비밀번호 일치 확인
    let pass1 = $("#pass1").val();
    let pass2 = $("#pass2").val();
    if (pass1 != pass2) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    return true;
}

function inputEmailDomainReplace() {
    let regExp = /[^a-z0-9\.]/g;
    if (regExp.test($(this).val())) { // 영문 대소문자, 숫자가 아니면
        alert("이메일 도메인은 영문 소문자, 숫자, 점(.)만 가능합니다.");
        $(this).val($(this).val().replace(regExp, ""));
    }
}

function inputCharReplace() {
    let regExp = /[^A-Za-z0-9]/gi;
    if (regExp.test($(this).val())) { // 영문 대소문자, 숫자가 아니면
        alert("영문 대소문자와 숫자만 가능합니다.");
        $(this).val($(this).val().replace(regExp, ""));
    }
}

function findZipcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                addr += extraAddr;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            $("#zipcode").val(data.zonecode);
            $("#address1").val(addr);

            // 커서를 상세주소 필드로 이동한다.
            $("#address2").focus();
        }
    }).open();
}
