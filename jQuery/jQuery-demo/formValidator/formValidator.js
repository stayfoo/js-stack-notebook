//====================================================================================================
// [插件名称] jQuery formValidator
//----------------------------------------------------------------------------------------------------
// [描    述] jQuery formValidator表单验证插件，它是基于jQuery类库，实现了js脚本于页面的分离。对一个表
//            单对象，你只需要写一行代码就可以轻松实现20种以上的脚本控制。现支持一个表单元素累加很多种
//            校验方式,采用配置信息的思想，而不是把信息写在表单元素上，能比较完美的实现ajax请求。
//----------------------------------------------------------------------------------------------------
// [作者网名] 猫冬	
// [日    期] 2008-01-11	
// [邮    箱] wzmaodong@126.com
// [作者博客] http://wzmaodong.cnblogs.com
//====================================================================================================
var jQuery_formValidator_initConfig;
(function($) {

$.formValidator = 
{
	//各种校验方式支持的控件类型
	sustainType : function(id,setting)
	{
		var elem = $("#"+id).get(0);
		var srcTag = elem.tagName;
		var stype = elem.type;
		switch(setting.validateType)
		{
			case "InitValidator":
				return true;
			case "InputValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA" || srcTag == "SELECT"){
					return true;
				}else{
					return false;
				}
			case "CompareValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA")
				{
					if (stype == "checkbox" || stype == "radio"){
						return false;
					}else{
						return true;
					}
				}
				return false;
			case "AjaxValidator":
				if (stype == "text" || stype == "textarea" || stype == "file" || stype == "select-one"){
					return true;
				}else{
					return false;
				}
			case "RegexValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA")
				{
					if (stype == "checkbox" || stype == "radio"){
						return false;
					}else{
						return true;
					}
				}
				return false;
			case "FunctionValidator":
			    return true;
		}
	},
    
	initConfig : function(controlOptions)
	{
		var settings = 
		{
			validatorGroup : "1",
			alertMessage:false,
			onSuccess: function() {return true;},
			onError:function() {},
			submitOnce:false
		};
		controlOptions = controlOptions || {};
		$.extend(settings, controlOptions);
		if (jQuery_formValidator_initConfig == null ){jQuery_formValidator_initConfig = new Array();}
		jQuery_formValidator_initConfig.push( settings );
	},
	
	//如果validator对象对应的element对象的validator属性追加要进行的校验。
	appendValid : function(id, setting )
	{
		//如果是各种校验不支持的类型，就不追加到。返回-1表示没有追加成功
		if(!$.formValidator.sustainType(id,setting)) return -1;
		var srcjo = $("#"+id).get(0);   
		if (setting.validateType=="InitValidator" || !srcjo.settings || srcjo.settings == undefined ){srcjo.settings = new Array();}   
		var len = srcjo.settings.push( setting );
		srcjo.settings[len - 1].index = len - 1;
		return len - 1;
	},
	
	//如果validator对象对应的element对象的validator属性追加要进行的校验。
	getInitConfig : function( validatorGroup )
	{
		if(jQuery_formValidator_initConfig!=null)
		{
		    for(i=0;i<jQuery_formValidator_initConfig.length;i++)
		    {
		        if(validatorGroup==jQuery_formValidator_initConfig[i].validatorGroup)
				{
					return jQuery_formValidator_initConfig[i];
				}
		    }
		}
		return null;
	},
	
	//触发每个控件上的各种校验
	triggerValidate : function(returnObj)
	{
		switch(returnObj.setting.validateType)
		{
			case "InputValidator":
				$.formValidator.InputValid(returnObj);
				break;
			case "CompareValidator":
				$.formValidator.CompareValid(returnObj);
				break;
			case "AjaxValidator":
				$.formValidator.AjaxValid(returnObj);
				break;
			case "RegexValidator":
				$.formValidator.RegexValid(returnObj);
				break;
			case "FunctionValidator":
				$.formValidator.FunctionValid(returnObj);
				break;
		}
	},
	
	//设置显示信息
	SetTipState : function(tipid,showclass,showmsg)
	{
	    var tip = $("#"+tipid);
	    tip.removeClass();
	    tip.addClass( showclass );
	    tip.html( showmsg );
	},
	
	//设置错误的显示信息
	SetFailState : function(tipid,showmsg)
	{
	    var tip = $("#"+tipid);
	    tip.removeClass();
	    tip.addClass( "onError" );
	    tip.html( showmsg );
	},

	//根据单个对象,正确:正确提示,错误:错误提示
	ShowMessage : function(returnObj)
	{
	    var id = returnObj.id;
		var isValid = returnObj.isValid;
		var setting = returnObj.setting;//正确:setting[0],错误:对应的setting[i]
		var showmsg = "";
		var showclass = "";
		var settings = $("#"+id).get(0).settings;
		if (!isValid)
		{		
			if(setting.validateType=="AjaxValidator")
			{
				if(setting.lastValid=="")
				{
				    showclass = "onLoad";
				    showmsg = setting.onwait;
				}
				else
				{
				    showclass = "onError";
				    showmsg = setting.onerror;
				}
			}
			else
			{
				showmsg = (returnObj.errormsg==""? setting.onerror : returnObj.errormsg);
				showclass = "onError";
			}
			if($.formValidator.getInitConfig(settings[0].validatorGroup).alertMessage)		
			{
				var elem = $("#"+id).get(0);
				if(elem.validoldvalue!=$(elem).val()) alert(showmsg);   
			}
			else
			{
				$.formValidator.SetTipState(settings[0].tipid,showclass,showmsg);
			}
		}
		else
		{		
			//验证成功后,如果没有设置成功提示信息,则给出默认提示,否则给出自定义提示;允许为空,值为空的提示
			if(!$.formValidator.getInitConfig(setting.validatorGroup).alertMessage)
			{
				var showmsg = "";
				if ( $.formValidator.IsEmpty(id)){ 
					showmsg = setting.onempty;
				}else{
					showmsg = setting.oncorrect;
				}
			    $.formValidator.SetTipState(setting.tipid,"onSuccess",showmsg);
			}
		}
	},
    
	//获取指定字符串的长度
    GetLength : function(id)
    {
        var srcjo = $("#"+id);
        sType = srcjo.get(0).type;
        var len = 0;
        switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
		        var val = srcjo.val();
				for (var i = 0; i < val.length; i++) 
                {
			        if (val.charCodeAt(i) >= 0x4e00 && val.charCodeAt(i) <= 0x9fa5){ 
				        len += 2;
			        }else {
				        len++;
					}
		        }
		        break;
			case "checkbox":
			case "radio": 
				len = $("input[@type='"+sType+"'][@name='"+srcjo.attr("name")+"'][@checked]").length;
				break;
		    case "select-one":
		        len = srcjo.get(0).options ? srcjo.get(0).options.selectedIndex : -1;
				break;
			case "select-more":
				break;
	    }
		return len;
    },
    
	//结合empty这个属性，判断仅仅是否为空的校验情况。
    IsEmpty : function(id)
    {
        if($("#"+id).get(0).settings[0].empty && $.formValidator.GetLength(id)==0){
            return true;
        }else{
            return false;
		}
    },
    
	//对外调用：判断单个表单元素是否验证通过，不带回调函数
    IsOneValid : function(id)
    {
	    return OneIsValid(id,1).isValid;
    },
    
	//验证单个是否验证通过,正确返回settings[0],错误返回对应的settings[i]
	OneIsValid : function (id,index)
	{
		var returnObj = new Object();
		returnObj.id = id;
		returnObj.ajax = -1;
		returnObj.errormsg = "";       //自定义错误信息
		var elem = $("#"+id).get(0);
	    var settings = elem.settings;
	    var settingslen = settings.length;
		if($.formValidator.IsEmpty(id))
	    {
			returnObj.setting = settings[0];
	        returnObj.isValid = true;
	    }
	    else
	    {
		    for ( var i = index ; i < settingslen ; i ++ )
		    {   
			    returnObj.setting = settings[i];
			    if(settings[i].validateType!="AjaxValidator") {
			        $.formValidator.triggerValidate(returnObj);
			    }else{
			        returnObj.ajax = i;
				}
			    if(!settings[i].isValid) {
			        returnObj.isValid = false;
			        returnObj.setting = settings[i];
			        break;
			    }else{
			        returnObj.isValid = true;
					returnObj.setting = settings[0];
			        if(settings[i].validateType=="AjaxValidator") break;
			    }
		    }
		}
		//成功后的回调函数
		if(returnObj.isValid)
		{
			var lb_ret = returnObj.setting.onvalid($("#"+id).get(0),$("#"+id).val());
			if(lb_ret != undefined) 
			{
				if(typeof lb_ret == "string"){
					returnObj.errormsg = lb_ret;		//自定义错误
					returnObj.isValid = false;
				}else{
					settings[settings.length - 1].isValid = lb_ret;
					returnObj.isValid = lb_ret;
				}
			}
			
		}
		return returnObj;
	},

	//验证所有需要验证的对象，并返回是否验证成功。
	PageIsValid : function (validatorGroup)
	{
	    if(validatorGroup == null || validatorGroup == undefined) validatorGroup = "1";
		var isValid = true;
		var thefirstid = "";
		var returnObj,setting;
		var error_tip = "^"; 	//为了解决使用同个TIP提示问题:后面的成功或失败都不覆盖前面的失败
		$("form").each(function(i,form1)
		{
			for(i=0;i<form1.elements.length;i++)  
			{
				elem = form1.elements[i];
				if ( elem.settings!=undefined && elem.settings!=null )
				{ 
					if(elem.settings[0].validatorGroup==validatorGroup)
					{
						if($.formValidator.getInitConfig(validatorGroup).alertMessage) 
						{
							if(isValid)		//如果是弹出窗口的,发现一个错误就马上停止,并提示
							{
								returnObj = $.formValidator.OneIsValid(elem.id,1);	
								if (!returnObj.isValid) {
									$.formValidator.ShowMessage(returnObj);
									isValid = false;
									if(thefirstid==""){
									    thefirstid = returnObj.id;
									    setting = returnObj.setting;
									}
								}
							}
						}
						else
						{
							returnObj = $.formValidator.OneIsValid(elem.id,1);	
							if (!returnObj.isValid) {
								isValid = false;
								if (thefirstid == "")
								{
								    thefirstid = returnObj.id;
								    setting = returnObj.setting;
								}
								if (error_tip.indexOf("^" + elem.settings[0].tipid + "^") == -1) {
									error_tip = error_tip + elem.settings[0].tipid + "^";
									$.formValidator.ShowMessage(returnObj);
								}
							}
							else
							{
								if (error_tip.indexOf("^" + elem.settings[0].tipid + "^") == -1) {
									$.formValidator.ShowMessage(returnObj);
								}
							}
							
						}
					}
				}
			};
		});
		//成功或失败后，进行回调函数的处理，以及成功后的灰掉提交按钮的功能
		if(isValid)
		{
            isValid = $.formValidator.getInitConfig(validatorGroup).onSuccess();
			if($.formValidator.getInitConfig(validatorGroup).submitOnce){$("input[@type='submit']").attr("disabled",true);}
		}
		else
		{
			$.formValidator.getInitConfig(validatorGroup).onError(setting.onerror,$("#"+thefirstid));
			if(thefirstid!=""){$("#"+thefirstid).focus();}
		}
		return isValid;
	},

	//ajax校验
	AjaxValid : function(returnObj)
	{
		var id = returnObj.id;
	    var srcjo = $("#"+id);
		var setting = srcjo.get(0).settings[returnObj.ajax];
		var ls_url = setting.url;
	    if (srcjo.size() == 0 && srcjo.get(0).settings[0].empty) {
			returnObj.setting = $("#"+id).get(0).settings[0];
			returnObj.isValid = true;
			$.formValidator.ShowMessage(returnObj);
			setting.isValid = true;
			return;
		}
		if(setting.addidvalue)
		{
			var parm = id+"="+escape(srcjo.val());
			ls_url = ls_url + ((ls_url).indexOf("?")>0?("&"+ parm) : ("?"+parm));
		}
		$.ajax(
		{	
			mode : "abort",
			type : setting.type, 
			url : ls_url, 
			data : setting.data, 
			async : setting.async, 
			dataType : setting.datatype, 
			success : function(data){
			    setting0 = srcjo.get(0).settings[0];
			    if(setting.success(data))
			    {
			        $.formValidator.SetTipState(setting0.tipid,"onSuccess",setting0.oncorrect);
			        setting.isValid = true;
			    }
			    else
			    {
			        $.formValidator.SetTipState(setting0.tipid,"onError",setting.onerror);
			        setting.isValid = false;
			    }
			},
			complete : function(){
				if(setting.buttons && setting.buttons.length > 0) setting.buttons.attr({"disabled":false});
				setting.complete;
			}, 
			beforeSend : function(){
				//再服务器没有返回数据之前，先回调提交按钮
				if(setting.buttons && setting.buttons.length > 0) setting.buttons.attr({"disabled":true});
				var isvalid = setting.beforesend();
				if(isvalid) setting.isValid = false;		//如果前面ajax请求成功了，再次请求之前先当作错误处理
				setting.lastValid = "-1";
				return setting.beforesend;
			}, 
			error : function(){
				setting0 = srcjo.get(0).settings[0];
			    $.formValidator.SetTipState(setting0.tipid,"onError",setting.onerror);
			    setting.isValid = false;
				setting.error();
			},
			processData : setting.processdata 
		});
	},

	//对正则表达式进行校验（目前只针对input和textarea）
	RegexValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcTag = $("#"+id).get(0).tagName;
		var elem = $("#"+id).get(0);
		//如果有输入正则表达式，就进行表达式校验
		if(elem.settings[0].empty && elem.value==""){
			setting.isValid = true;
		}
		else 
		{
			var regexpress = setting.regexp;
			if(setting.datatype=="enum"){regexpress = eval("regexEnum."+regexpress);}
			if(regexpress==undefined || regexpress==""){
				setting.isValid = false;
				return;
			}
			var exp = new RegExp(regexpress, setting.param);
			if (exp.test($("#"+id).val())){
				setting.isValid = true;
			}else {
				setting.isValid = false;
			}
		}
	},
	
	//函数校验。返回true/false表示校验是否成功;返回字符串表示错误信息，校验失败;如果没有返回值表示处理函数，校验成功
	FunctionValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
	    var srcjo = $("#"+id);
		var lb_ret = setting.fun(srcjo.val(),srcjo.get(0));
		if(lb_ret != undefined) 
		{
			if(typeof lb_ret == "string"){
				setting.isValid = false;
				returnObj.errormsg = lb_ret;
			}else{
				setting.isValid = lb_ret;
			}
		}
	},
	
	//对input和select类型控件进行校验
	InputValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
		var elem = srcjo.get(0);
		var val = srcjo.val();
		var sType = elem.type;
		var len = $.formValidator.GetLength(id);
		switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
			case "checkbox":
			case "select-one":
			case "radio":
				if(sType=="select-one"){setting.type = "size";}
				if (setting.type == "size") {		//获得输入的字符长度，并进行校验
					if (len < setting.min || len > setting.max) {
						setting.isValid = false;
					}
					else {
						setting.isValid = true;
					}
				}
				else{
					stype = (typeof setting.min);
					if(stype =="number")
					{
						if(!isNaN(val))
						{
							nval = parseFloat(val);
							if(nval>=setting.min && nval<= setting.max){
								setting.isValid = true;
							}else{
								setting.isValid = false;
							}
						}
						else
							setting.isValid = false;
					}
					if(stype =="string"){
						if(val>=setting.min && val<= setting.max){
							setting.isValid = true;
						}else{
							setting.isValid = false;
						}
					}
				}
				break;
		    case "select-more":
                break;
		}
	},
	
	CompareValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
	    var desjo = $("#"+setting.desID );
	    setting.isValid = false;
		curvalue = srcjo.val();
		ls_data = desjo.val();
		if(setting.datatype=="number")
        {
            if(!isNaN(curvalue) && !isNaN(ls_data))
			{
				curvalue = parseFloat(curvalue);
                ls_data = parseFloat(ls_data);
			}
			else
			{
			    return;
			}
        }
		
	    switch(setting.operateor)
	    {
	        case "=":
	            if(curvalue == ls_data){setting.isValid = true;}
	            break;
	        case "!=":
	            if(curvalue != ls_data){setting.isValid = true;}
	            break;
	        case ">":
	            if(curvalue > ls_data){setting.isValid = true;}
	            break;
	        case ">=":
	            if(curvalue >= ls_data){setting.isValid = true;}
	            break;
	        case "<": 
	            if(curvalue < ls_data){setting.isValid = true;}
	            break;
	        case "<=":
	            if(curvalue <= ls_data){setting.isValid = true;}
	            break;
	        case "oneok":
	            if($.formValidator.IsEmpty(id) || $.formValidator.IsEmpty(IsEmpty.desID) ){
	                setting.isValid = false;
				}else{
	                setting.isValid = true;
				}
	    }
	}
};

//每个校验控件必须初始化的
$.fn.formValidator = function( msgOptions) 
{
	var setting = 
	{
		validatorGroup : "1",
		empty :false,
		submitonce : false,
		automodify : false,
		entermovetonext : true,
		onshow :"请输入内容",
		onfocus: "请输入内容",
		oncorrect: "输入正确",
		onempty: "输入内容为空",
		onvalid : function(){return true},
		onfocusevent : function(){},
		onblurevent : function(){},
		tipid : this.get(0).id+"Tip",
		defaultvalue : null,
		validateType : "InitValidator"
	};
	msgOptions = msgOptions || {};
	$.extend(setting, msgOptions);
	return this.each(function()
	{
		var triggerID = this.id;
		var tip = $( "#"+setting.tipid );
		$.formValidator.appendValid(triggerID,setting);
		//初始化显示信息
		if(!$.formValidator.getInitConfig(setting.validatorGroup).alertMessage){
			$.formValidator.SetTipState(setting.tipid,"onShow",setting.onshow);
		}
		var srcTag = this.tagName;
		var defaultValue = setting.defaultvalue;
		if (srcTag == "INPUT" || srcTag=="TEXTAREA")
		{
			var stype = this.type;
			var joeach = $(this);
			if (stype == "checkbox" || stype == "radio") {
				joeach = $("input[@name=" + this.name + "]");
				if(defaultValue)
				{
					checkobj = $("input[@name=" + this.name + "][@value='"+defaultValue+"']");
					if(checkobj.length==1) checkobj.attr("checked","true");
				}
			}
			else
			{
			    if(defaultValue) joeach.val(setting.defaultvalue);
			}
			//注册获得焦点的事件。改变提示对象的文字和样式，保存原值
			joeach.focus(function()
			{	
				var settings = joeach.get(0).settings;
				if(!$.formValidator.getInitConfig(settings[0].validatorGroup).alertMessage){
				    $.formValidator.SetTipState(settings[0].tipid,"onFocus",settings[0].onfocus);
				}
				if (stype == "password" || stype == "text" || stype == "textarea" || stype == "file") {
					this.validoldvalue = $(this).val();
				}
				settings[0].onfocusevent(joeach.get(0));
			});
			//注册失去焦点的事件。进行校验，改变提示对象的文字和样式；出错就提示处理
			joeach.blur(function()
			{   
				var elem = joeach.get(0);
				var thefirstsettings = elem.settings;
				var settingslen = thefirstsettings.length;
				var returnObj = $.formValidator.OneIsValid(triggerID,1);
				if(returnObj.ajax >= 0 && elem.validoldvalue!=$(elem).val()) 
				{
			        $.formValidator.SetTipState(thefirstsettings[0].tipid,"onLoad",thefirstsettings[returnObj.ajax].onwait);
				    $.formValidator.AjaxValid(returnObj);
				}
				else
				{
				    $.formValidator.ShowMessage(returnObj);
					if(!returnObj.isValid)
					{
						//自动修正错误
						var auto = thefirstsettings[0].automodify && (elem.type=="text" || elem.type=="textarea" || elem.type=="file");
						if(auto && !$.formValidator.getInitConfig(thefirstsettings[0].validatorGroup).alertMessage)
						{
							alert(returnObj.setting.onerror);
							$.formValidator.SetTipState(thefirstsettings[0].tipid,"onShow",setting.onshow);
						}
					}
				}
				thefirstsettings[0].onblurevent(joeach.get(0));
			});
		} 
		else if (srcTag == "SELECT")
		{
		    srcjo = $(this);
		    var settings = this.settings;
		    if (defaultValue)
		    {			 
			    $.each( this.options ,function(){	
				    if ( this.value==defaultValue) this.selected = true;		  
			    });				  
		    }

			srcjo.focus(function()
			{	
				if(!$.formValidator.getInitConfig(setting.validatorGroup).alertMessage){
				    $.formValidator.SetTipState(settings[0].tipid,"onFocus",settings[0].onfocus);
				}
			});
			
			srcjo.bind( "change" , function()
			{
				var returnObj = $.formValidator.OneIsValid(triggerID,1);	 
				if ( returnObj.ajax >= 0 && this.validoldvalue!=$(this).val()){
				    $.formValidator.AjaxValid(triggerID, returnObj.setting);
				}else{
					$.formValidator.ShowMessage(returnObj);    
				}
			});
		}
	});

}; 

$.fn.InputValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		min : 0,
		max : 99999999999999,
		forceValid : false,
		type : "size",
		defaultValue:null,
		onerror:"输入错误",
		validateType:"InputValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.SelectValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		onerror:"必须选择",
		defaultValue:null,
		validateType:"SelectValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.CompareValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		desID : "",
		operateor :"=",
		onerror:"输入错误",
		validateType:"CompareValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(settings, controlOptions);
	return this.each(function(){
		var li_index = $.formValidator.appendValid(this.id,settings);
		/*if(li_index==-1) return;
		var elem = this;
		$("#"+settings.desID).blur(function(){
			var returnObj = $.formValidator.OneIsValid(elem.id,1);
			if (!returnObj.isValid && returnObj.setting.index == li_index) {
				var returnObj = $.formValidator.OneIsValid(elem.id, li_index);
			}
			if ( returnObj.ajax >= 0 && this.validoldvalue!=$(this).val()) {
			    $.formValidator.AjaxValid(triggerID, returnObj.setting);
			}
			else{
				$.formValidator.ShowMessage(returnObj);
			}
		});*/
	});
};

$.fn.RegexValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		regexp : "",
		param : "i",
		datatype : "string",
		onerror:"输入的格式不正确",
		validateType:"RegexValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.FunctionValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : true,
		onerror:"你输入的数据不正确，请确认",
		fun : function(){this.isValid = true;},
		validateType:"FunctionValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.AjaxValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		lastValid : "",
		type : "GET",
		url : "",
		addidvalue : true,
		datatype : "html",
		data : "",
		async : true,
		beforesend : function(){return true;},
		success : function(){return true;},
		complete : function(){},
		processdata : false,
		error : function(){},
		buttons : null,
		onerror:"服务器校验没有通过",
		onwait:"正在等待服务器返回数据",
		validateType:"AjaxValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(settings, controlOptions);
	return this.each(function()
	{
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.DefaultPassed = function()
{
	return this.each(function()
	{
		var settings = this.settings;
		for ( var i = 1 ; i < settings.length ; i ++ )
		{   
			settings[i].isValid = true;
			$.formValidator.SetTipState(settings[0].tipid,"onSuccess",settings[0].oncorrect);
		}
	});
};

})(jQuery);