<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $note->title }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            color: #333;
            background: white;
        }
        
        /* Slide container - matches canvas aspect ratio (800x600) */
        .slide {
            width: 211mm;
            height: 158mm;
            page-break-after: always;
            position: relative;
            display: flex;
            flex-direction: column;
            background: white;
        }
        
        /* Drawing Slide - Full page image */
        .drawing-slide {
            padding: 0;
            margin: 0;
            justify-content: center;
            align-items: center;
            background: white;
            overflow: hidden;
            box-sizing: border-box;
        }
        
        .drawing-image {
            max-width: 211mm;
            max-height: 158mm;
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
        }
        
        /* Slide number footer */
        .slide-footer {
            position: absolute;
            bottom: 20px;
            right: 30px;
            font-size: 12px;
            color: #999;
            background: rgba(255, 255, 255, 0.9);
            padding: 5px 12px;
            border-radius: 15px;
        }
    </style>
</head>
<body>
    <!-- Drawing Slides Only - One per image -->
    @if(!empty($images))
        @foreach($images as $index => $img)
            <div class="slide drawing-slide">
                <img src="{{ $img }}" class="drawing-image" alt="Drawing {{ $index + 1 }}" />
                <div class="slide-footer">{{ $index + 1 }}</div>
            </div>
        @endforeach
    @endif
</body>
</html>
