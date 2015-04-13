# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0003_pedido_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='numero_pedido',
            field=models.CharField(max_length=120, blank=True),
            preserve_default=True,
        ),
    ]
