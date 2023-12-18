<?php
    $tracks = json_decode(file_get_contents('data.json'),true);

    // Form Validation
    $artist = $_POST['artist'] ?? '';
    $title = $_POST['title'] ?? '';
    $length = $_POST['length'] ?? '00:00';
    $year = $_POST['year'] ?? '1860';

    if(count($_POST) > 0) {
        $errors = [];
        if(trim($artist) === '')
            $errors['artist'] = 'Artist field is required!';
        else if(strlen(trim($artist)) < 2)
            $errors['artist'] = 'The name of the artist should contain at least two letters!';

        if(trim($title) === '')
            $errors['title'] = 'Title field is required!';
        else if(strlen(trim($title)) < 1)
            $errors['title'] = 'The title should contain at least one letter!';

        if(!preg_match('/^\d+:[0-5]{1}[0-9]{1}$/',$length))
            $errors['length'] ="Length is not a valid time!";

        if(strlen($year) != 4)
            $errors['year'] = 'Year must be 4 digit long!';
        else{
            if(intval($year) > 2023 || intval($year) < 1860)
                $errors['year'] = 'Year must be between 1860 and 2023!';
        }

        $errors = array_map(fn($e) => "<span style='color: red'> $e </span>", $errors);
        
        if(count($errors) == 0){
            $tracks[] = [
                'artist' => $artist,
                'title' => $title,
                'length' => $length,
                'year' => $year
            ];

            file_put_contents('data.json',json_encode($tracks,JSON_PRETTY_PRINT));

            $_POST = [];
            $artist = $title = $length = $year = "";
        }
    }

    // Sorting for display
    usort($tracks, 'track_comp');

    function track_comp($a,$b){
        if($a['year'] === $b['year']){
            return 0;
        }else if($a['year'] < $b['year']){
            return -1;
        }else{
            return 1;
        }
    }

    function count_length($tracks){
        $sum = 0;
        foreach($tracks as $track){
            [$minutes,$seconds] = explode(':', $track['length']);
            $sum += ($minutes*60 + $seconds);
        }

        return $sum;
    }

    function get_retros($tracks){
        $retros = array_filter($tracks, fn($e)=> intval($e['year']) < 1990);
        return $retros;
    }
?>

<form method="post">
    <label for="artist">Artist:</label><br>
    <input id="artist" type="text" name="artist" value="<?=$artist?>"> <?= $errors['artist'] ?? '' ?> <br>
    <label for="title">Title:</label><br>
    <input id="title" type="text" name="title" value="<?=$title?>"> <?= $errors['title'] ?? '' ?> <br>
    <label for="length">Length:</label><br>
    <input id="length" type="text" name="length" value="<?=$length?>"> <?= $errors['length'] ?? '' ?> <br>
    <label for="year">Year:</label><br>
    <input id="year" type="text" name="year" value="<?=$year?>"> <?= $errors['year'] ?? '' ?> <br><br>
    <input type="submit" name="submit" value="Add Song">
</form>

<table style="border: 1px solid black; border-spacing: 0px;">
    <tr>
        <th style="border: 1px solid black; padding: 5px;">Artist</th>
        <th style="border: 1px solid black; padding: 5px;">Title</th>
        <th style="border: 1px solid black; padding: 5px;">Length</th>
        <th style="border: 1px solid black; padding: 5px;">Year</th>
    </tr>
    <?php foreach ($tracks as $track) :?>
        <tr>
            <td style="border: 1px solid black; padding: 5px;"><?=$track['artist']?></td>
            <td style="border: 1px solid black; padding: 5px;"><?=$track['title']?></td>
            <td style="border: 1px solid black; padding: 5px;"><?=$track['length']?></td>
            <td style="border: 1px solid black; padding: 5px;"><?=$track['year']?></td>
        </tr>
    <?php endforeach ?>
    <tr>
        <td style="border: 1px solid black; padding: 5px; text-align: center;" colspan="4">
            Total play time: <?= str_pad(floor(count_length($tracks)/60), 2, "0", STR_PAD_LEFT); ?>:<?= str_pad(count_length($tracks)%60, 2, "0", STR_PAD_LEFT); ?>
        </td>
    </tr>
</table>

<h3>Retro Songs</h3>
<?php foreach ( get_retros($tracks) as $track): ?>
    <li> <?=$track['artist']?> -  <?=$track['title']?></li>
<?php endforeach ?>