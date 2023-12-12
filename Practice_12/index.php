<?php
    session_start(); // $_SESSION

    $data = json_decode(file_get_contents("data.json"), true);
    $grades = ["","inadequate","adequate","moderate","good","eminent"];

    $error = "";
    if(isset($_SESSION['loginerror'])){
        if($_SESSION['loginerror'] == 1) $error = "The username is invalid!";
        if($_SESSION['loginerror'] == 2) $error = "Incorrect Password";
        unset($_SESSION['loginerror']);
    }
    
    if(isset($_POST['subject']) && isset($_POST['grade'])){
        $sub = $_POST['subject'];
        $grade = intval($_POST['grade']);
        $data[$sub]['grade'] = $grade;
        file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT));
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice 12.</title>
</head>
<body>
    <?php if(isset($_SESSION['userid'])): ?>
    <table>
        <tr>
            <th>Subject Code</th>
            <th>Name</th>
            <th>Teacher</th>
            <th>Credit</th>
            <th>Grade</th>
        </tr>
        <?php foreach($data as $value): ?>
            <tr>
                <td><?= $value['subject_id'] ?></td>
                <td><?= $value['subject_name'] ?></td>
                <td><?= $value['teacher'] ?></td>
                <td><?= $value['credit'] ?></td>
                <td><?= $grades[$value['grade']] ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
    <h2>Submit Grades</h2>
    <form action="index.php" method="post">
        Subject:
        <select name="subject">
            <?php foreach(array_filter($data,fn($t) => $t['grade'] == 0) as $i => $v): ?>
                <option value="<?= $i ?>"><?= $v['subject_name'] ?></option>
            <?php endforeach; ?>
        </select>
        Grade: <input type="number" name="grade" min="1" max="5" value="5">
        <button type="submit">Save</button>
    </form>
    <?php else: ?>
        <form action="login.php" method="post">
            Username: <input type="text" name="un"> <br>
            Password: <input type="password" name="pw"> <br>
            <button type="submit">Login</button>
        </form>
        <span style="color: red"> <?= $error ?> </span>
    <?php endif; ?>
</body>
</html>