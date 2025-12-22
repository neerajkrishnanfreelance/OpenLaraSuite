<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $note->title }}</title>
    <style>
        body {
            font-family: sans-serif;
            color: #333;
            line-height: 1.6;
        }
        .header {
            margin-bottom: 20px;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
            color: #111;
        }
        .meta {
            font-size: 12px;
            color: #777;
            margin-top: 5px;
        }
        .meta span {
            margin-right: 15px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            text-transform: uppercase;
            color: #555;
            border-bottom: 1px solid #eee;
        }
        .content {
            white-space: pre-wrap;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .attachments {
            font-size: 12px;
        }
        .attachment-item {
            margin-bottom: 5px;
        }
        .attachment-link {
            text-decoration: none;
            color: #2563eb;
        }
        .page-break {
            page-break-after: always;
        }
        .drawing-image {
            width: 100%;
            height: auto;
            margin-top: 10px;
            display: block;
        }
        .slide-label {
            font-size: 10px;
            color: #999;
            text-align: right;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="title">{{ $note->title ?? 'Untitled Note' }}</h1>
        <div class="meta">
            <span>Created: {{ $note->created_at->format('M d, Y H:i') }}</span>
            @if($note->project)
                <span>Project: {{ $note->project->name }}</span>
            @endif
            @if($note->task)
                <span>Task: {{ $note->task->title }}</span>
            @endif
        </div>
    </div>

    @if($note->content)
        <div class="section-title">Notes</div>
        <div class="content">{{ $note->content }}</div>
    @endif

    @if($note->attachments->count() > 0)
        <div class="section-title">Attachments</div>
        <div class="attachments">
            @foreach($note->attachments as $att)
                <div class="attachment-item">
                    @php
                        $url = $att->type === 'youtube' ? $att->url : asset('storage/' . $att->file_path);
                    @endphp
                    &bull; <a href="{{ $url }}" class="attachment-link" target="_blank">{{ $att->name }}</a>
                    <span style="color: #999;">({{ $att->type === 'youtube' ? 'Video' : 'File' }})</span>
                </div>
            @endforeach
        </div>
    @endif

    @if(!empty($images))
        @foreach($images as $index => $img)
            <div class="page-break"></div>
            <div class="slide-label">Slide {{ $index + 1 }}</div>
            <img src="{{ $img }}" class="drawing-image" />
        @endforeach
    @endif
</body>
</html>
