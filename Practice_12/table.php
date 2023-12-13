<?php
    session_start();
    $result = [];
    $filter = $_GET['filter'] ?? '';

    if(isset($_SESSION["userid"])){
        $data = json_decode(file_get_contents("data.json"), true);
        $grades = ["","inadequate","adequate","moderate","good","eminent"];
        $result = [];

        foreach ($data as $value) {
            if (trim($filter === '' || strpos($value["subject_id"],$filter) !== false)) {
                $value['grade'] = $grades[$value['grade']];
                unset($value["id"]);
                $result[] = $value;
            }
        }
    }
    echo json_encode($result, JSON_PRETTY_PRINT);
?>