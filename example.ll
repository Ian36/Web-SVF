; ModuleID = 'example.c'
source_filename = "example.c"
target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-unknown-linux-gnu"

@.str = private unnamed_addr constant [14 x i8] c"Hello, World!\00", align 1

; Function Attrs: noinline nounwind optnone uwtable
define dso_local i32 @main() #0 !dbg !7 {
entry:
  %retval = alloca i32, align 4
  %me = alloca i32, align 4
  %me1 = alloca i32, align 4
  %me2 = alloca i32, align 4
  %me3 = alloca i32, align 4
  store i32 0, i32* %retval, align 4
  call void @llvm.dbg.declare(metadata i32* %me, metadata !11, metadata !DIExpression()), !dbg !12
  store i32 0, i32* %me, align 4, !dbg !12
  call void @llvm.dbg.declare(metadata i32* %me1, metadata !13, metadata !DIExpression()), !dbg !14
  store i32 1, i32* %me1, align 4, !dbg !14
  call void @llvm.dbg.declare(metadata i32* %me2, metadata !15, metadata !DIExpression()), !dbg !16
  store i32 2, i32* %me2, align 4, !dbg !16
  call void @llvm.dbg.declare(metadata i32* %me3, metadata !17, metadata !DIExpression()), !dbg !18
  store i32 3, i32* %me3, align 4, !dbg !18
  %call = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([14 x i8], [14 x i8]* @.str, i64 0, i64 0)), !dbg !19
  ret i32 0, !dbg !20
}

; Function Attrs: nofree nosync nounwind readnone speculatable willreturn
declare void @llvm.dbg.declare(metadata, metadata, metadata) #1

declare dso_local i32 @printf(i8*, ...) #2

attributes #0 = { noinline nounwind optnone uwtable "disable-tail-calls"="false" "frame-pointer"="all" "less-precise-fpmad"="false" "min-legal-vector-width"="0" "no-infs-fp-math"="false" "no-jump-tables"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="true" "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+cx8,+fxsr,+mmx,+sse,+sse2,+x87" "tune-cpu"="generic" "unsafe-fp-math"="false" "use-soft-float"="false" }
attributes #1 = { nofree nosync nounwind readnone speculatable willreturn }
attributes #2 = { "disable-tail-calls"="false" "frame-pointer"="all" "less-precise-fpmad"="false" "no-infs-fp-math"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="true" "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+cx8,+fxsr,+mmx,+sse,+sse2,+x87" "tune-cpu"="generic" "unsafe-fp-math"="false" "use-soft-float"="false" }

!llvm.dbg.cu = !{!0}
!llvm.module.flags = !{!3, !4, !5}
!llvm.ident = !{!6}

!0 = distinct !DICompileUnit(language: DW_LANG_C99, file: !1, producer: "clang version 12.0.0", isOptimized: false, runtimeVersion: 0, emissionKind: FullDebug, enums: !2, splitDebugInlining: false, nameTableKind: None)
!1 = !DIFile(filename: "example.c", directory: "/home/ian/Desktop/CapstoneProject")
!2 = !{}
!3 = !{i32 7, !"Dwarf Version", i32 4}
!4 = !{i32 2, !"Debug Info Version", i32 3}
!5 = !{i32 1, !"wchar_size", i32 4}
!6 = !{!"clang version 12.0.0"}
!7 = distinct !DISubprogram(name: "main", scope: !1, file: !1, line: 2, type: !8, scopeLine: 2, spFlags: DISPFlagDefinition, unit: !0, retainedNodes: !2)
!8 = !DISubroutineType(types: !9)
!9 = !{!10}
!10 = !DIBasicType(name: "int", size: 32, encoding: DW_ATE_signed)
!11 = !DILocalVariable(name: "me", scope: !7, file: !1, line: 4, type: !10)
!12 = !DILocation(line: 4, column: 6, scope: !7)
!13 = !DILocalVariable(name: "me1", scope: !7, file: !1, line: 5, type: !10)
!14 = !DILocation(line: 5, column: 7, scope: !7)
!15 = !DILocalVariable(name: "me2", scope: !7, file: !1, line: 6, type: !10)
!16 = !DILocation(line: 6, column: 7, scope: !7)
!17 = !DILocalVariable(name: "me3", scope: !7, file: !1, line: 7, type: !10)
!18 = !DILocation(line: 7, column: 7, scope: !7)
!19 = !DILocation(line: 9, column: 3, scope: !7)
!20 = !DILocation(line: 11, column: 4, scope: !7)
