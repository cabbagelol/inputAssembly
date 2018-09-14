// * =====================================================================
// * 插件名：inpit_assembly
// * 作者：cababgelol
// * 技术支持：cababgelol.net/inpit-assembly/2.0/
// * =====================================================================
;(function() {
	var inpit_assembly = function(ele, opt) {
			this.$ele = ele,
				this.defaults = {
					event: "click",
					event_: {
						state: false,
						class: '',
						complete: () => {},
					},
					selected: "active", // 默认记号
					selected_data: [],
					ischeck_: true, // 是否在设置最少值初始最少选择数量
					ischeck_class: false,
					max: () => {},
					min: () => {},
					on: () => {},
					success: () => {}
				},
				this.options = $.extend({}, this.defaults, opt);
		},
		inpot_field = [];
	inpit_assembly.prototype = {
		err: {
			to: function (err) {
				return function w(){}
				console.error(err )
			}
		},
		onutil: function(options, event, attr) {
			var $check_ = this.$ele
			//选项遍历
			function thats() {
				var attr = [];
				$($check_).find("[name][value]")
					.each(function() {
						attr.push($(this).attr("value"))
					})
				return attr;
			}
			for(let i = 0, obj = this.$ele; i < attr.length; i++) {
				for(let x of attr[i].data) {
					for(let r = 0, length = inpot_field[0].formname.split(","); r < length.length; r++) { // 获取标记选项
						var Element, parentElement;
						for(el_txt of thats()) {
							// 正则处理
							is = (typeof x == "string") ? x : x.test(el_txt);
							if(is) {
								Element = $("[name='" + attr[i].name + "'][value='" + (typeof is == "string" ? x : el_txt) + "']");
								//								if(Element.parents("[formname]").attr("formname") == length[r]) {
								// 接口处理
								switch(options) {
									case "disabled" || "DISABLED":
										Element.attr("disabled", true);
										break;

									case "remdisabled" || "REMDISABLED":
										Element.attr("disabled", false);
										break;

									case "togdisabled" || "TOGDISABLED":
										Element.attr("disabled") != "disabled" ? Element.attr("disabled", true) : Element.attr("disabled", false);
										break;
										
									case "delete" || "DELETE":
										Element.remove()
										break;

									case "remove" || "REMOVE":
										Element.removeClass(inpot_field[0].sels)
										break;

									case "add" || "ADD":
										Element.addClass(inpot_field[0].sels)
										break;

									case "toggle" || "TOGGLE":
										!Element.is("." + inpot_field[0].sels) ? Element.addClass(inpot_field[0].sels) : Element.removeClass(inpot_field[0].sels)
										break;
								}
								//								}
							}
						}
					}
				}
			}
		},
		fun: function() {
			var $this = this,
				$fun = this.options,
				$check_ = this.$ele,
				$check_class = $fun.selected == undefined ? "active" : $fun.selected,
				$check_index = 0;

			//初始
			$check_.find("[radio],[checkbox]").each(function() {
				var this_ = $(this);
				this_.attr("index", $check_index);

				// * ===============
				// * selected_data的初始值
				// * ================					
				
				var obj_selected_data = $fun.selected_data[0];
				
				if(obj_selected_data != undefined) {
					let obj,
						selected_data = $fun.selected_data;

					for(i = 0; i < selected_data.length; i++) {

						// * =============
						// * 相对
						// * =============						
						for(let x = 0; x < selected_data[i].data.length; x++) {
							let formname = $("[formname]");

							if(typeof obj_selected_data.data == "object") {
								//选项
								var obj_option_ = $((function() {
									let fr = selected_data[i].formname;
									if(fr != undefined)
										fr = "[formname=" + fr + "]";
									else if(fr == undefined)
										fr = "[formname]"
									return fr;
								})() + " [name=" + selected_data[i].name + "][value=" + selected_data[i].data[x] + "]");

								obj_selected_data.data.length <= 0 ? (() => {
									// 单选
									if(typeof(formname.find("[index]").attr("checkbox")) != "undefined") {
										obj_option_.removeClass($check_class);
									};

									// 复选
									if(typeof(formname.find("[index]").attr("radio")) != "undefined") {
										obj_option_.removeClass($check_class);
									};
								})() : (() => {
									// * ==============
									// * 区分单选与复选
									// * 单选保证仅有一个值，其余丢弃
									// * ==============

									// 单选
									if(typeof(formname.find("[index]").attr("checkbox")) != "undefined") {
										obj_option_.addClass($check_class);
									};

									// 复选
									if(typeof(formname.find("[index]").attr("radio")) != "undefined") {
										obj_option_.addClass($check_class);
									};

								})();
							};
						}

						// * =============
						// * 全选
						// * =============
						if(typeof selected_data[i].data == "string" && selected_data[i].data === "all") {
							$((() => {
								return(typeof selected_data[i].formname) != "undefined" ? "[formname=" + selected_data[i].formname + "] " : ""
							})() + "[name=" + selected_data[i].name + "][value]").addClass($check_class);
						};
					}
				}

				// * ===============
				// * radio - 复选
				// * 初始值
				// * ================	
				if($fun.ischeck_) {
					if(this_.attr("radio") != undefined) {
						if(this_.attr("min") != undefined) {
							//存在min
							var obj = $check_.find(" > [index]").eq($check_index);
							if($fun.ischeck_class && $(this).find("[name]").eq(i).hasClass('ack')) {
								for(var i = 0; i < $(this).find("[name]").length; i++) {
									for(var i = 0; i < this_.attr("min"); i++) {
										obj.find("> *").eq(i).addClass($check_class);
									}
								}
							}
							if($fun.ischeck_class == false) {
								for(var i = 0; i < this_.attr("min"); i++) {
									this_.find("[name][value]").eq(i).addClass($check_class);
								}
							}
						}
					}
					
					// * ===============
					// * checkbox - 单选
					// * 初始值
					// * ================	
					if(this_.attr("checkbox") != undefined) {
						obj = $check_.find(" > [index]").eq($check_index);
						for(i = 0; i < this_.find("[name][value]").length; i++) {
							obj.find("> [name=" + this_.find("[name][value]").eq(i).attr("name") + "][value]").eq(0).addClass($check_class);
						}
					}
				}
				++$check_index;
			});

			(function() {
				// * ==============
				// * 表单内部管理器
				// * name 表单名字
				// * sele 记号
				// * ==============
				var attr = {
					obj: $check_,
					sels: $check_class,
					formname: (function() {
						for(i = 0, name = ''; i < $check_.length; i++) {
							name += $($check_[i]).attr("formname") + (i == ($check_.length - 1) ? "" : ",");
						}
						return name;
					})()
				};

				inpot_field.push(attr);
			}());
			
			if($fun.event_.state) {($check_.on($fun.event, "[radio] [name][value] " + $fun.event_.class + " , [checkbox] [name][value] "  + $fun.event_.class, function(event) {
				try{
					if (typeof $fun.event_.complete == 'undefined') { throw "complete is not defined" }
					$fun.event_.complete( event )
				} catch(e) {
					new inpit_assembly().err(e);
				}
				event.stopPropagation();
			}))}
			
			//单选
			($check_.on($fun.event, "[checkbox] [name][value]", function(event) {
				event.stopPropagation();
				var this_ = $(this),
					this_obj = this_.attr("name"),
					this_ack = $check_.find(" [name=" + this_obj + "]." + $check_class);
				if(this_.attr("disabled") != undefined) {
					return $fun.on("disabled", ons(this_, $check_));
				}
				if(this_ack.length > 0) {
					removeClass(this_ack, $check_class, $check_);
				}
				add_Class(this_, $check_class, $check_);
			}));

			//复选
			($check_.on($fun.event, "[radio] [name][value]", function(event, max, min) {
				event.stopPropagation();
				var this_ = $(this),
					this_siblings = this_.siblings(),
					this_obj = this_siblings.attr("name"),
					this_ack = $check_.find(" [name=" + this_obj + "]." + $check_class);
				this_max = (function() {
					var max = this_.parent().attr("max");
					max == undefined ? max = this_.parents().find("[name][value]").length + 1 : null
					return max;
				})();
				this_min = this_.parent().attr("min");
				if(this_.hasClass($check_class)) {
					//min
					removeClass(this_, $check_class, $check_);
					if(this_ack.length == this_min) {
						add_Class(this_, $check_class, $check_);
						$fun.min(ons(this_, $check_), this_min);
					}
				} else {
					//max
					if(this_max != undefined) {
						if(this_ack.length <= this_max) {
							add_Class(this_, $check_class, $check_);
							if(this_ack.length == this_max) {
								removeClass(this_, $check_class, $check_);
								$fun.max(ons(this_, $check_), this_max);
							}
						}
					}
				}
				return [this_, this_max, this_min];
			}));

			// * ================
			// * S 工具类
			// * ================
			var attributeCount = function(obj) {
				var count = 0;
				for(var i in obj) { if( obj.hasOwnProperty(i) ) { count++ } }
				return count;
			};

			// * ================
			// * 删除记号
			// * ================
			function removeClass(e, selected, object) {
				e.attr("disabled") == undefined ? (function() {
					e.attr("class").length <= selected.length ? e.removeAttr("class") : e.removeClass(selected);
					$fun.on("rem", ons(e, object));
				})() : []
			};

			// * ================
			// * 添加记号
			// * ================			
			function add_Class(e, selected, object) {
				e.attr("disabled") == undefined ? (() => {
					e.addClass(selected);
					$fun.on("add", ons(e, object))
				})() : (() => {
					$fun.on("disabled", ons(e, object))
				})()
			};

			// * ================
			// * on 返回结构
			// * ================

			function ons(e, object) {
				let ischecked = null;
				return {
					'$this': {
						// 对象
						'obj': e,
						// 类型
						'type': ( (obj = e) => {
							for( let i of ["checkbox", "radio"] ) {
								if(obj.parents("[index]")[0].hasAttribute(i))
									return obj = i;
							}
						})(),
						// 父
						'parent': ((val = object) => {
							return(val == undefined ? {} : val)
						})(),
						// 数量
						'length': e.length,
						'checked': ((obj = e,
							attr = (function() {
								var t = e.attr("class"),k;
								if(t != undefined) k = t.split(" ");
								return k;
							})()
						) => {
							if(attr != undefined)
								for(i of attr) {
									if(i.indexOf($fun.selected) >= 0) ischecked = true;
									if(i.indexOf($fun.selected) < 0) ischecked = false
								}
							else ischecked = false;
							return ischecked;
						})(),
						'val': e.attr("value")
					},
					// 事件
					'$events': {
						'event': $._data((object.get(0))),
						'length': attributeCount($._data((object.get(0))).events)
					}
				}
			};

			// * ===============
			// * 取type='inpit/assembly'内选择值
			// * val则最后结果
			// * ================
			
			// * ================ 你很皮
			$check_.find("button[type=result], button[type=reset]").on("click",function () { 
				if ( $(this).attr("type") === 'result' ) {
					$fun.success( check_result( $(this) ) )
				} else {
					let $che = []
					$check_.find("[name][value]").each(function(index){ 
						$che.push({n:$(this).attr("name"),v:$(this).attr("value")})
					})
					$che.forEach(function(i, index){ 
						$check_.inpitassembly("remove",[{name:i.n, data:[i.v]}]) 
					})
				}
			})
			
			check_result = (obj, val = []) => {
				let c_n = []
				if(obj != undefined) {
					if (String(obj).indexOf(",") > 0) { obj.split(',').forEach(function(i){ Result(i) }) }
					else { Result(obj)	  }
					function Result(obj){
						$("[formname=" + (function() {
							if(typeof obj == "string")
								return obj;
							if(typeof obj == "object")
								return obj.parents("[formname]").attr("formname");
						})() + "] [index]").each(function() {
							// * ===============
							// * checkbox - 单选
							// * ================				
							if($(this).is("[checkbox]")) {
								val.push($(this).find(" *." + $check_class).attr("value"));
							}
							// * ===============
							// * radio - 复选
							// * ================						
							if($(this).is("[radio]")) {
								$(this).find("*." + $check_class).each(function() {
									val.push( $(this).attr("value") );
								})
							}
						});	
					}
				}
				data = {
					data: {
						data: new Set(val) == undefined ? [] : (function(){
								let ary = (Array.from(new Set(val)) || new Set(val)), ary_ = []
								ary.forEach(function(i){
									if (i != undefined) ary_.push(i)
								})
								return ary_;
						})(),
						parameter: $fun,
						obj: $check_
					}
				};
				// 返回结果
				return data || $fun.success(data);
			};
			// * ================
			// * E 工具类
			// * ================
		}
	};
	$.fn.inpitassembly = function(options, val) {
		var o = new inpit_assembly(this, options);
		if(typeof options == "string") o.onutil(options, this, val)
		else o.fun();
		return this;			
	}
	$.fn.then = function(options,val){
		return this;	
	}
})();